import _ from 'lodash'
import blueoak from '@blueoak/list'
import getLicenseText from './getLicenseText'

// convert BO license data into more accessible format
const convert = o => {
  return o.map(r => {
    return {
      name: r.name,
      licenses: _.flatten(
        r.licenses.map(l => {
          return _.values(_.pick(l, 'id'))
        })
      )
    }
  })
}

let revised = convert(blueoak)

// This gets Blue Oak rating of permissive license
const getColor = (license, info) => {
  let color = null
  info.forEach(r => {
    if (r.licenses.includes(license)) {
      color = r.name
    }
  })
  return color
}

const updateLicenseInfo = async o => {
  let { license, licenses, licenseText, repository } = o
  // if multiple licenses, map over each to return type
  if (licenses) {
    return await Promise.all(licenses.map(async ({ type }) => {
      // TODO: When licenseText was same as text, no need for await and hence resolved license name etc
      return {
        license: type,
        text: await getLicenseText(repository, licenseText),
        color: getColor(type, revised)
      }
    })
  )}

  // if just one license, things are simple, just return object with license/color
  if (license && typeof license !== 'object') {
    return [
      {
        license: license,
        text: await getLicenseText(repository, licenseText),
        color: getColor(license, revised)
      }
    ]
    // sometimes license can be object with license.type notation
  }
  if (license && typeof license === 'object') {
    return [
      {
        license: license.type,
        text: await getLicenseText(repository, licenseText),
        color: getColor(license.type, revised)
      }
    ]
  }
  return [{ license: null, color: null }]
}

const updateLicense = async o => {
  // regardless of whether license or licenses, we just put info into 'licenses' variable
  let licenses = await updateLicenseInfo(o)
  return {
    ...o,
    licenses
  }
}

export default updateLicense
