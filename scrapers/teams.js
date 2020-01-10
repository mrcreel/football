const axios = require('axios')
const cheerio = require('cheerio')

require('dotenv').config()

const writeJson = require('./functions/writeJson')
const { cleanText } = require('./functions/helperFunctions')

const pages = [
  'http://misshsfootball.com/Teams/index.htm',
  'http://misshsfootball.com/Teams/Inactive.htm'
]

const scrapePages = async pages => {
  const requests = pages.map(async page => {
    /** Read the page with Axios */
    const response = await axios.get(page)
    const body = await response.data

    /** Load page with Cheerio */
    const $ = await cheerio.load(body)

    /** Create array of data elements */
    const scrapedElements = $('td[width=152] a')

    const pageRequestData = []
    scrapedElements.each((idx, item) => {
      const teamId = $(item)
        .attr('href')
        .split('.')[0]
      const teamName = cleanText($(item).text())
      const team = {
        teamId,
        teamName,
        inState: true
      }

      pageRequestData.push(team)
    })

    return await pageRequestData
  })

  const allRequestsData = await axios.all(requests)
  // TODO: flatten allRequestsData
  const allData = []
  allRequestsData.forEach(pageData => {
    pageData.forEach((item, idx) => {
      allData.push(item)
    })
  })

  writeJson(allData)
}

scrapePages(pages)
