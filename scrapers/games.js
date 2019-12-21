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
      .find({ inState: true }) //, teamId: 'Ashland' })

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
      console.log(`${teamId}`)
      for (let sec = 0; sec < sections; sec++) {
        for (let yr = 0; yr < 4; yr++) {
          const teamMascot = cleanText($(pageData[sec * 20 + 2][yr + 1]).text())
          if (teamMascot.length > 1) {
            const teamName = cleanText($(pageData[sec * 20 + 1][yr + 1]).text())
            const teamSeason = parseInt($(pageData[sec * 20][yr + 1]).text())

            for (let wk = 1; wk <= 16; wk++) {
              const tm2Score = parseInt(
                $(pageData[sec * 20 + 3 + wk][yr * 7 + 7]).text()
              )

              if (!isNaN(tm2Score)) {
                const tm2Name = cleanText(
                  $(pageData[sec * 20 + 3 + wk][yr * 7 + 3]).text()
                )
                const gameDate = new Date(
                  $(pageData[sec * 20 + 3 + wk][yr * 7 + 1]).text()
                ).toDateString()
                const gmLoc = $(pageData[sec * 20 + 3 + wk][yr * 7 + 2]).text()
                const divisionGame =
                  $(pageData[sec * 20 + 3 + wk][yr * 7 + 4]).text() == '*'
                const tm1Score = parseInt(
                  $(pageData[sec * 20 + 3 + wk][yr * 7 + 6]).text()
                )

                const gameInfo = {
                  gameSeason: teamSeason,
                  gameDate,
                  gameWeek: wk,
                  gameNeutral: gmLoc == 'N',
                  gameLocation: gmLoc == 'A' ? 'H' : gmLoc,
                  divisionGame,
                  playoffGame: !divisionGame && wk > 11,
                  team1Id: gmLoc == 'A' ? '' : teamId,
                  team1Name: gmLoc == 'A' ? tm2Name : teamName,
                  team2Id: gmLoc == 'A' ? teamId : '',
                  team2Name: gmLoc == 'A' ? teamName : tm2Name,
                  team1Score: gmLoc == 'A' ? tm2Score : tm1Score,
                  team2Score: gmLoc == 'A' ? tm1Score : tm2Score,
                  tieGame: tm1Score == tm2Score,
                  team1Win:
                    gmLoc == 'A' ? tm2Score > tm1Score : tm1Score > tm2Score
                }

                console.log(gameInfo)
                // TODO: Save to mongoDb
                client
                  .db('football')
                  .collection('games')
                  .insertOne(gameInfo)
              }
            }

            // Update seasons collection with this info
            /*
            client
              .db('football')
              .collection('seasons')
              .updateOne(
                { teamId: teamId, teamSeason: teamSeason },
                { $set: { teamName: teamName, teamMascot: teamMascot } }
              )
              */
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
