const axios = require('axios')
const cheerio = require('cheerio')
const { MongoClient } = require('mongodb')
require('dotenv').config()

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

const activeTeams = async () => {
  console.log('activeTeams.js')

  const pageData = []

  /** Read the page with Axios */
  const response = await axios.get('http://misshsfootball.com/Teams/index.htm')
  const body = await response.data

  /** Load page with Cheerio */
  const $ = await cheerio.load(body)

  /** Create array of data elements */
  const data = $('td[width=152] a')

  /** Scrape the data elements */
  data.each((idx, item) => {
    const teamId = $(item)
      .attr('href')
      .split('.')[0]
    const teamName = cleanText($(item).text())
    const team = {
      idx,
      teamId,
      teamName,
      inState: true
    }
    /** Push each object to pageData array */
    pageData.push(team)
  })

  /** Set-up Mongo and connect to DB */
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect to the MongoDB cluster
    await client.connect()

    /** Create collection index */
    client
      .db('football')
      .collection('teams')
      .createIndex({ teamId: 1 }, { unique: true })

    /** Save pageData to mongoDb collection */
    const result = await client
      .db('football')
      .collection('teams')
      .insertMany(pageData, { ordered: false })

    console.log(
      `${result.insertedCount} new teams(s) created with the following id(s):`
    )
    console.log(result.insertedIds)
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

activeTeams()
