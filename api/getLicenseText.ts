import axios from 'axios'
import _ from 'lodash'

const getLicenseText = async (repository, licenseText) => {
  if (!licenseText) {
    try {
      let { url } = repository
      if (url.startsWith('git')) {
        url = _.replace(url, 'git', 'https')
        url = _.replace(url, '.git', '')
      }
      url = _.replace(url, 'github.com', 'raw.githubusercontent.com')
      // if URL starts with 'git' format into normal URL
      let result = await axios(`${url}/master/LICENSE`)
      if (!result.data) {
        result = await axios(`${url}/master/license`)
      }
      return result.data
    } catch (e) {
      // TODO: If no github license, may need to create from SPDX
      return null
    }
  } else {
    return licenseText
  }
}

export default getLicenseText
