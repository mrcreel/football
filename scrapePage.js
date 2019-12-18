const axios = require('axios')
const cheerio = require('cheerio')

const scrapePage = async url => {
  console.log(`Scrape Data from ${url}`)
  const response = await axios.get(url)
  const body = await response.data
  const $ = cheerio.load(body)
  const $tr = $('tr')

  const pageData = []
  $tr.each((i, row) => {
    const $row = $(row)
    if (i > 5 && i < $tr.length - 3) {
      const rowData = []
      const rowChildren = $row.children()
      for (let child = 0; child < rowChildren.length; child++) {
        rowData.push(rowChildren[child])
        // rowData.push($row.children().length)
      }
      pageData.push(rowData)
    }
  })

  return await pageData
}

module.exports = scrapePage
