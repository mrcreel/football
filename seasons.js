const { MongoClient } = require('mongodb')
require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

const seasons = async () => {
  console.log('seasons.js')

  /** TODO: Read teams collection on mongoDB */

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect to the MongoDB cluster
    const teamsArray = []
    await client.connect()

    client
      .db('football')
      .collection('seasons')
      .createIndex({ teamId: 1, teamSeason: 1 }, { unique: true })

    const result = await client
      .db('football')
      .collection('teams')
      .find({ inState: true })

    /** Read each from 'teams' collection */

    result.forEach(async doc => {
      const teamId = doc.teamId
      const page = `http://misshsfootball.com/Teams/${teamId}_Standings.htm`

      const response = await axios.get(page)
      const body = await response.data

      const $ = await cheerio.load(body)
      const data = $(`tr`)

      let $data = $(data)

      $data = $data.slice(8, $data.length - 5)

      const pageData = []

      // console.log(`${teamId}-> ${page} -> ${$data.length}`)

      let ct = 1
      $data.each(async (index, element) => {
        const rowData = $(element).children()
        const teamSeason = parseInt($(rowData[1]).text())
        if (!isNaN(teamSeason)) {
          const teamRegion = cleanText($(rowData[2]).text())
          const splitClass = teamRegion.split(/[\s-]+/)
          const teamClass =
            splitClass.length == 1 ? splitClass[0] : splitClass[1]
          // console.log(`${ct}) ${teamSeason}: ${teamClass} | ${teamRegion}`)

          const season = await client
            .db('football')
            .collection('seasons')
            .insertOne({
              teamId,
              teamSeason,
              teamRegion,
              teamClass
            })
          console.log(
            `${ct}) ${teamId} Season ${teamSeason} created with id: ${season.insertedId}`
          )

          ct++
        }
      })
    })
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}

seasons()
