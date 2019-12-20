const { MongoClient } = require('mongodb')
require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

const games = async () => {
  /** Read teams collection on mongoDB */

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    await client.connect()

    // Connect to the MongoDB cluster
    const result = await client
      .db('football')
      .collection('teams')
      .find({ inState: true })

    result.forEach(async doc => {
      const teamId = await doc.teamId
      const page = `http://misshsfootball.com/Teams/${teamId}_Scores.htm`

      const response = await axios.get(page)
      const body = await response.data

      const $ = await cheerio.load(body)
      const data = $(`tr`)

      const $data = $(data).slice(6, $(data).length - 3)

      console.log(`${teamId}: ${($data.length / 20) * 4} seasons`)

      const sections = $data.length / 20
      const pageData = []
      $data.each(async (index, element) => {
        pageData.push($(element).children())
      })
      for (let sec = 0; sec < sections; sec++) {
        for (let yr = 0; yr < 4; yr++) {
          const teamMascot = cleanText($(pageData[sec * 20 + 2][yr + 1]).text())
          if (teamMascot.length > 1) {
            const teamName = cleanText($(pageData[sec * 20 + 1][yr + 1]).text())
            const teamSeason = parseInt($(pageData[sec * 20][yr + 1]).text())
            console.log(`${teamId}->${teamSeason}: ${teamName} ${teamMascot}`)

            // TODO: Update seasons collection with this info

            const tmSeasons = client
              .db('football')
              .collection('seasons')
              .updateOne(
                { teamId: teamId, teamSeason: teamSeason },
                { $set: { teamName: teamName, teamMascot: teamMascot } }
              )
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    // await client.close(console.log('Disconnected'))
  }
}

games()
