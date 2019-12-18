const cheerio = require('cheerio')

const scrapePage = require('./scrapePage')

const page = 'http://misshsfootball.com/Teams/Inactive.htm'

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

const parseTeams = async () => {
  console.log('parseTeams.js')
  let pageData = await scrapePage(page)
  pageData = pageData.slice(1)

  const $ = cheerio.load(pageData)

  pageData.forEach(row => {
    for (let c = 0; c < row.length; c++) {
      console.log(c, $(row[c]).text(), $(row[c]).length)
    }
  })
  console.log('Rows:', pageData.length)
}

module.exports = parseTeams
