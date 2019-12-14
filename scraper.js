const axios = require('axios')
const cheerio = require('cheerio')
const MongoClient = require('mongodb').MongoClient
const uuidv4 = require('uuid/v4')

console.log('scraper.js')
console.log('=======================')

const BASE_URL = 'http://misshsfootball.com/Teams/'

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

//here we make our timeout synchronous using Promises
// https://stackoverflow.com/a/57948281
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const uri =
  'mongodb+srv://admin:admin@cluster0-4yyve.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

client.connect(async err => {
  const startingPoints = ['index.htm', 'Inactive.htm']
  getData(startingPoints)
  console.log('=======================')
})
client.close()

const Games = []
const Seasons = []

const getData = async pages => {
  await asyncForEach(pages, async page => {
    let url = `${BASE_URL}${page}`
    console.log(`getData from ${url}`)

    const response = await axios.get(url)
    const body = await response.data

    const $ = cheerio.load(body)

    const teamsArray = []
    $('td[width=152] a').each((idx, ele) => {
      const $ele = $(ele)
      const teamId = $ele.attr('href').split('.')[0]
      const teamName = $ele.text()
      teamsArray.push([teamId, teamName])

      /*
      const teamsDocument = client.db('football').collection('teams')
      try {
        teamsDocument.insertOne({ _id: teamId, teamName })
        console.log(teamId)
      } catch (err) {
        console.log(err)
      }
      */
    })

    await asyncForEach(teamsArray, async team => {
      const teamId = team[0]
      const teamName = team[1]
      console.log('************************')
      console.log(`**${teamName}`)
      console.log('************************')
      const scoresUrl = `${BASE_URL}${teamId}_Scores.htm`
      console.log(`****Get Scores from ${scoresUrl}`)

      const response = await axios.get(scoresUrl)
      const body = await response.data

      const $ = cheerio.load(body)

      const pageElements = []
      let $tr = $('tr')
      $tr = $tr.slice(6, $tr.length - 3)
      console.log('******Rows:', $tr.length)
      const sections = $tr.length / 20
      console.log('******Sections:', sections)

      $tr.each((i, row) => {
        let $rowChildren = $(row).children()
        $rowChildren = $rowChildren.slice(1, $rowChildren.length - 1)
        const rowElements = []
        for (let c = 0; c < $rowChildren.length; c++) {
          rowElements.push($($rowChildren[c]).text())
        }
        pageElements.push(rowElements)
      })
      console.log('-----------------')
      console.log(`teamId: ${teamId}`)
      console.log('-----------------')
      for (let sec = 0; sec < sections; sec++) {
        for (let yr = 0; yr < 4; yr++) {
          const tmName = cleanText(pageElements[1 + 20 * sec][yr])
          if (tmName.length > 1) {
            const tmYear = parseInt(pageElements[0 + 20 * sec][yr])
            const tmMascot = cleanText(pageElements[2 + 20 * sec][yr])
            const teamSeason = {
              _id: teamId,
              tmYear,
              tmName,
              tmMascot,
              teamSeasonGames: []
            }

            for (let wk = 4; wk < 20; wk++) {
              const tm1Score = parseInt(pageElements[wk + 20 * sec][yr * 7 + 5])
              if (!isNaN(tm1Score)) {
                const gameIid = uuidv4()
                const gameDate = new Date(pageElements[wk + 20 * sec][yr * 7])
                const gameWeek = wk - 3
                const gameLoc = pageElements[wk + 20 * sec][yr * 7 + 1]
                const tm2Name = pageElements[wk + 20 * sec][yr * 7 + 2]
                const tm2Score = parseInt(
                  pageElements[wk + 20 * sec][yr * 7 + 6]
                )
                const team1Id = gameLoc == 'H' ? teamId : ''
                const team2Id = gameLoc == 'H' ? '' : teamId
                const team1Name = gameLoc == 'H' ? teamName : cleanText(tm2Name)
                const team2Name = gameLoc == 'H' ? cleanText(tm2Name) : teamName
                const neutral = gameLoc == 'N'
                const gameLocation = !neutral ? 'H' : 'N'
                const division = pageElements[wk + 20 * sec][yr * 7 + 3] == '*'
                const team1Score = gameLoc == 'H' ? tm1Score : tm2Score
                const team2Score = gameLoc == 'H' ? tm2Score : tm1Score

                const playoff = gameWeek > 11 && division !== '*'

                teamSeason['teamSeasonGames'].push(gameIid)

                const gameData = {
                  _id: gameIid,
                  gameSeason: tmYear,
                  gameDate,
                  gameWeek,
                  neutral,
                  playoff,
                  division,
                  gameLocation,
                  team1Id,
                  team1Name,
                  team1Score,
                  team2Id,
                  team2Name,
                  team2Score,
                  tieGame: team1Score == team2Score,
                  team1Win: team1Score > team2Score
                }
                const gameTest = {
                  tmYear,
                  gameWeek,
                  team1Name,
                  team2Name
                }
                const gameDataJson = JSON.stringify(gameTest)
                const gamesDocument = client.db('football').collection('games')
                if (Games.indexOf(gameDataJson) == -1) {
                  Games.push(gameDataJson)
                  try {
                    gamesDocument.insertOne(gameData)
                  } catch (err) {
                    console.log(err)
                  }
                } else {
                  console.log(
                    'Week:',
                    gameWeek,
                    '*****DUPE*****',
                    teamName,
                    tm2Name
                  )
                }
              }
            }
            console.log(
              teamSeason['tmYear'],
              teamSeason['tmName'],
              'Games:',
              teamSeason['teamSeasonGames'].length
            )
          }
        }
      }
      console.log('Games so far:', Games.length)
      console.log('Sleeping...')
      await sleep(3000)
      console.log('Next')
    })
  })
}
