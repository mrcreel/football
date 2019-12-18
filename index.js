require('dotenv').config()

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
    pageData.push({ teamId, teamName, inState: true })
  })

  return await pageData
}

const saveTeams = async page => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect to the MongoDB cluster
    await client.connect()
    // Make the appropriate DB calls

    console.log('Connected...')

    const pageData = await scrapeTeams(page)

    const dbCollection = 'teams'

    client
      .db('football')
      .collection('teams')
      .createIndex({ teamId: 1 }, { unique: true })

    /** TODO: Throw a readable actual error if a dupe is tried to be inserted*/
    const result = await client
      .db('football')
      .collection('teams')
      .insertMany(pageData)

    console.log(
      `${result.insertedCount} new teams(s) created with the following id(s):`
    )
    console.log(result.insertedIds)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
    console.log('Disconnected')
  }
}

// saveActiveTeams()
// saveInactiveTeams()

const teamIndex = async () => {
  db.myColl.createIndex({ category: 1 })
}
const pages = [
  'http://misshsfootball.com/Teams/index.htm',
  'http://misshsfootball.com/Teams/Inactive.htm'
]

pages.forEach(async page => {
  await saveTeams(page)
})
// saveTeams(page)
// scrapeTeams('http://misshsfootball.com/Teams/index.htm')
// scrapeTeams('http://misshsfootball.com/Teams/Inactive.htm')
// loadPage('http://misshsfootball.com/Teams/Aberdeen_Standings.htm', 'tr')
// loadPage('http://misshsfootball.com/Teams/Aberdeen_Scores.htm', 'tr')
