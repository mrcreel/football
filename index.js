require('dotenv').config()

const axios = require('axios')

const cheerio = require('cheerio')

const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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

  return await { teamId, pageData }
}

const scrapeStandings = async teamData => {
  const teamId = teamData.teamId
  const page = `http://misshsfootball.com/Teams/${teamId}_Standings.htm`

  const data = await loadPage(page, 'tr')
  const $ = await cheerio.load(data)
  let $data = $(data)

  $data = $data.slice(8, $data.length - 5)

  const pageData = []

  console.log(`${teamId}-> ${page}: ${$data.length}`)
  $data.each((index, element) => {
    const rowData = $(element).children()
    const teamSeason = parseInt($(rowData[1]).text())
    if (!isNaN(teamSeason)) {
      const teamRegion = cleanText($(rowData[2]).text())
      const splitClass = teamRegion.split(/[\s-]+/)
      const teamClass = splitClass.length == 1 ? splitClass[0] : splitClass[1]
      pageData.push({
        teamId,
        teamSeason,
        teamRegion,
        teamClass
      })
    }
  })
  console.log(pageData)

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

    const pageData = await scrapeTeams(page)
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
  }
}
/*
const pages = [
  'http://misshsfootball.com/Teams/index.htm',
  'http://misshsfootball.com/Teams/Inactive.htm'
]

pages.forEach(async page => {
  await saveTeams(page)
})
*/

const closeClient = async () => {
  return await client.close()
}

const readTeams = async () => {
  try {
    // Connect to the MongoDB cluster
    await client.connect()

    const result = await client
      .db('football')
      .collection('teams')
      .find()

    result.forEach(async function(doc) {
      const teamData = {
        docId: doc._id,
        teamId: doc.teamId
      }

      const $data = await scrapeStandings(teamData)
    })
  } catch (e) {
    console.error(e)
  }
}

readTeams()
closeClient()
// saveTeams(page)
// scrapeTeams('http://misshsfootball.com/Teams/index.htm')
// scrapeTeams('http://misshsfootball.com/Teams/Inactive.htm')
// loadPage('http://misshsfootball.com/Teams/Aberdeen_Standings.htm', 'tr')
// loadPage('http://misshsfootball.com/Teams/Aberdeen_Scores.htm', 'tr')
