const axios = require('axios')
const cheerio = require('cheerio')

const getPage = async url => {
  console.log(`Get page: ${url}`)
  const response = await axios.get(url)
  const body = await response.data

  const $ = cheerio.load(body)

  return await $
}

module.exports = getPage
