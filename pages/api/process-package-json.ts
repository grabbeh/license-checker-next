import _ from 'lodash'
import semver from 'semver'
import axios from 'axios'
import convert from '../../api/addAttributes'
import { NextApiRequest, NextApiResponse } from 'next'
//import test from './test.json'

// better to run on tree process
const getScopedAsDeps = o => {
  return Object.entries(o).map(([k, v]) => ({ name: k, version: v }))
}

const getDep = (
  name: string,
  version: string,
  scoped: boolean,
  error: string
) => {
  return {
    name,
    parent: { name, version, licenses: [{ license: null, color: null }] },
    scoped,
    error
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let data = await checkInput(req.body)
    //let data = { name: 'Test package', msg: 'Hello World' }
    if (!data.name) {
      res.status(400).send("This doesn't seem to be a valid package.json file")
    }
    let { dependencies } = data
    //let dependencies = test
    // No dependencies
    if (!dependencies) {
      res.status(400).send("I can't seem to find any dependencies")
    }
    // scoped packages error
    // version not found error - just grab repository details and then get latest version?
    let tree = await getTreeData(dependencies)
    let fullTree = { parent: null, name: data.name, data, children: tree }
    // TODO: Potentally add license text to combined rather than tree as not needed in full tree
    let flattened = flatten(tree)
    let uniq = _.uniqBy(flattened, 'name')
    let flat = _.orderBy(uniq, ['name'], ['asc'])
    res.status(200).json({ tree: fullTree, flat })
  } catch (err) {
    res.status(500).json(err)
  }
}

const checkInput = async input => {
  // could include validation here
  if (input.url) {
    let { data } = await axios(input.url)
    return data
  } else if (input.json) {
    return JSON.parse(input.json)
  } else {
    return new Error('Neither URL or JSON')
  }
}

const flatten = a => {
  // if top level has dependencies then it won't return its own data under the next fn below
  // hence this fn
  let topLevel = _.reduce(
    a,
    (result, { children, parent }) => {
      return [...result, children ? parent : []]
    },
    []
  )
  let lower = a.map(({ children, parent }) => {
    return children ? flatten(children) : parent
  })
  return _.flattenDeep(_.concat(topLevel, lower))
}

const pickAttributes = o => {
  return _.pick(
    o,
    'license',
    'licenses',
    'licenseText',
    'name',
    'description',
    'dependencies',
    'version',
    'repository',
    'author'
  )
}

// given a set of dependencies it will map over them and first attempt to get npm data.
// Where that fails it will return basic data in format equivalent to npm form or grab all
// data in case there was a version error
const getTreeData = async dependencies => {
  const promises = Object.entries(dependencies).map(async ([k, v]) => {
    let { data } = await axios(getNpmURL(k, v))
    // if data returned from npm url process it
    let picked = pickAttributes(data)
    let { dependencies, name } = data
    // if a module has further dependencies run fn again
    // sometimes dependencies are an empty object hence check for length
    if (dependencies && Object.keys(dependencies).length > 0) {
      // TODO: Align children and dependencies (children added for viz data)
      return {
        parent: await convert(picked),
        name,
        children: await getTreeData(dependencies)
        //dependencies: await getTreeData(dependencies)
      }
      // if no dependencies return parent data
    } else return { name, parent: await convert(picked) }
  })
  // https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all
  // we use this code to give an array of all results, both errors and valid
  let responses = await Promise.all(
    promises.map(p =>
      p.catch(e => {
        return e
      })
    )
  )
  // Map over response objects to replace errors with data
  let mopUp = responses.map(async r => {
    // check for r.response as that indicates an error in the original request
    if (r.response) {
      let { config, data, status, headers } = r.response
      let { version, dependency } = convertURL(config.url)
      if (
        headers['npm-notice'] ===
        'ERROR: you cannot fetch versions for scoped packages'
      ) {
        return getDep(dependency, version, true, 'Scoped package')
      }
      if (status === 404 && data.startsWith('version not found')) {
        let {
          data: { versions }
        } = await axios(getAllNpm(dependency))
        let latest = Object.values(versions).pop()
        let picked = pickAttributes(latest)
        let { name, dependencies } = latest
        if (dependencies && Object.keys(dependencies).length > 0) {
          return {
            parent: await convert(picked),
            name,
            children: await getTreeData(dependencies),
            //dependencies: await getTreeData(dependencies),
            error: 'Latest version only',
            latest: true
          }
          // if no dependencies return parent data
        } else
          return {
            name,
            parent: await convert(picked),
            error: 'Latest version only',
            latest: true
          }
      }
    }
    return r
  })

  let altered = await Promise.all(
    mopUp.map(p =>
      p.catch(e => {
        return e
      })
    )
  )
  // do further for any remaining errors
  const valid = altered.filter(result => !(result instanceof Error))
  return valid
}

const convertURL = (url: string) => {
  let urlParts = url.replace(/\/\s*$/, '').split('/')
  let rev = urlParts.slice(3)
  let version = rev[rev.length - 1]
  let dependency = ''
  if (rev[0].startsWith('@')) {
    dependency = rev.slice(0, -1).join('/')
  } else {
    dependency = rev[0]
  }
  return { version, dependency }
}

const getNpmURL = (name, version) => {
  let clean = semver.valid(semver.coerce(version))
  return `https://registry.npmjs.org/${name}/${clean}`
}

const getAllNpm = name => {
  return `https://registry.npmjs.org/${name}`
}
