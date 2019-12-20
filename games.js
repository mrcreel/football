const { MongoClient } = require('mongodb')
require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

const games = async () => {
  console.log('games.js')

  /** Read teams collection on mongoDB */

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect to the MongoDB cluster
    await client.connect()

    /* Read all inState teams in db
    const result = await client
      .db('football')
      .collection('teams')
      .find({ inState: true })
    */

    // Read one team for testing

    const result = await client
      .db('football')
      .collection('teams')
      .find({ inState: true, teamId: 'Greenecounty' })

    let ct = 1
    result.forEach(async doc => {
      const teamId = doc.teamId
      const page = `${ct}) http://misshsfootball.com/Teams/${teamId}_Scores.htm`

      console.log(`${page}`)

      const response = await axios.get(page)
      ct++
    })
  } catch (err) {
    console.log(error)
  } finally {
    await client.close()
  }
}

games()
