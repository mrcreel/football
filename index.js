const axios = require('axios')

const cheerio = require('cheerio')

const { MongoClient } = require('mongodb')

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

const loadPage = async (url, selector) => {
  const response = await axios.get(url)
  const body = await response.data

  const $ = await cheerio.load(body)

  const data = $(`${selector}`)

  return await data
}
const scrapeTeams = async page => {
  const data = await loadPage(page, 'td[width=152] a')
  const $ = await cheerio.load(data)
  const $data = $(data)

  const pageData = []

  $data.each((index, element) => {
    const teamName = cleanText($(element).text())
    const teamId = $(element)
      .attr('href')
      .split('.')[0]
    // console.log({ index, teamId, teamName, inState: true })
    pageData.push({ index, teamId, teamName, inState: true })
  })

  return await pageData
}

const saveTeams = async () => {
  const uri =
    'mongodb+srv://admin:admin@cluster0-4yyve.mongodb.net/test?retryWrites=true&w=majority'

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect to the MongoDB cluster
    await client.connect()
    // Make the appropriate DB calls

    console.log('Connected...')

    const pageData = await scrapeTeams(
      'http://misshsfootball.com/Teams/Inactive.htm'
    )

    console.log(pageData)

    const collection = 'teams'

    /** TODO: Save to MongoDB */
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
    console.log('Disconnected')
  }
}

saveTeams()
// scrapeTeams('http://misshsfootball.com/Teams/index.htm')
// scrapeTeams('http://misshsfootball.com/Teams/Inactive.htm')
// loadPage('http://misshsfootball.com/Teams/Aberdeen_Standings.htm', 'tr')
// loadPage('http://misshsfootball.com/Teams/Aberdeen_Scores.htm', 'tr')
