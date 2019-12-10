const MongoClient = require('mongodb').MongoClient
const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = 'http://misshsfootball.com/Teams/'

const uri =
  'mongodb+srv://admin:admin@cluster0-4yyve.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const getTeams = async pageUrl => {
  client.connect(async err => {
    const db = client.db('football')
    /*
    const teamsUrl = `${BASE_URL}${pageUrl}`
    let response = await axios.get(teamsUrl)
    let html = response.data

    let $ = cheerio.load(html)

    let dbCollection = db.collection('teams')

    $('td[width=152] a').each((idx, ele) => {
      const $ele = $(ele)
      const teamId = $ele.attr('href').split('.')[0]
      const teamName = $ele.text().replace(/(\r\n|\n|\r) /gm, '')

      const teamDocument = {
        _id: teamId,
        teamName,
        instate: true
      }
      /*
      try {
        dbCollection.insertOne(teamDocument)
        console.log(teamId)
      } catch (err) {
        console.log(err)
      }
      */
    const teamId = 'Taylorsville'
    const scoresPage = `${teamId}_Scores.htm`

    const scoresUrl = `${BASE_URL}${scoresPage}`

    console.log(scoresUrl)

    let response = await axios.get(scoresUrl)
    let html = response.data

    let dbCollection = db.collection('games')

    $ = cheerio.load(html)

    let ct = 0
    const pageRowElements = []
    const $tr = $('tr')
    const sections = ($tr.length - 9) / 20
    $tr.each((idx, row) => {
      const rowElements = []
      let $row = $(row)

      const $rowLength = $row.children().length
      if (idx !== 3 && ($rowLength == 6 || $rowLength == 30)) {
        let rowChildren = $row.children()
        rowChildren = rowChildren.slice(1, rowChildren.length - 1)
        for (let elem = 0; elem < rowChildren.length; elem++) {
          rowElements.push([$(rowChildren[elem]).text()])
        }
        pageRowElements.push(rowElements)
        ct++
      }
    })
    for (let sec = 0; sec < sections; sec++) {
      const rowNum = sec * 19
      for (let yr = 0; yr < pageRowElements[rowNum].length; yr++) {
        const teamSeason = parseInt(pageRowElements[rowNum][0 + yr][0])
        const teamName = pageRowElements[rowNum + 1][0 + yr][0].replace(
          /(\r\n|\n|\r) /gm,
          ''
        )
        const teamMascot = pageRowElements[rowNum + 2][0 + yr][0].replace(
          /(\r\n|\n|\r) /gm,
          ''
        )
        if (teamName.length != 1) {
          const teamYear = {
            sec,
            rowNum,
            teamSeason,
            teamName,
            teamMascot
          }
          // console.log(teamYear)

          const tm1Id = teamId
          const tm1Name = teamName
          const gameSeason = teamSeason
          console.log('----------')
          console.log(`---${gameSeason}---`)
          console.log('----------')
          console.log(`-> ${teamName} Schedule`)
          for (let wk = 1; wk <= 16; wk++) {
            let team1Id = tm1Id
            let team2Id = ''
            const tm1Score = parseInt(
              pageRowElements[rowNum + 2 + wk][5 + yr * 7][0]
            )
            let team1Score = tm1Score
            if (!isNaN(tm1Score)) {
              const tm2Name = pageRowElements[rowNum + 2 + wk][
                2 + yr * 7
              ][0].replace(/(\r\n|\n|\r) /gm, '')
              const neutralGame =
                pageRowElements[rowNum + 2 + wk][1 + yr * 7][0] == 'N'
              let tm1Loc = pageRowElements[rowNum + 2 + wk][1 + yr * 7][0]
              let gameLoc = tm1Loc
              let tm2Id = ''
              let tm2Score = parseInt(
                pageRowElements[rowNum + 2 + wk][6 + yr * 7][0]
              )
              const divisionGame =
                pageRowElements[rowNum + 2 + wk][3 + yr * 7][0] == '*'

              console.log(
                `Week: ${wk} -> ${tm1Name}[${tm1Score}] ${gameLoc} vs ${tm2Name}[${tm2Score}]`
              )

              if (tm1Loc == 'A') {
                gameLoc = 'H'
                team1Id = tm2Id
                team1Name = tm2Name
                team1Score = tm2Score
                team2Score = tm1Score
                team2Id = tm1Id
                team2Name = tm1Name

                console.log('SWITCH')
                console.log(
                  `Week: ${wk} -> ${team1Name}[${team1Score}] ${gameLoc} vs ${team2Name}[${team2Score}]`
                )
              }
              if (tm1Loc == 'N' && tm1Name > tm2Name) {
                team1Id = tm2Id
                team1Name = tm2Name
                team1Score = tm2Score
                team2Score = tm1Score
                team2Id = tm1Id
                team2Name = tm1Name

                console.log('SWITCH')
                console.log(
                  `Week: ${wk} -> ${team1Name}[${team1Score}] ${gameLoc} vs ${team2Name}[${team2Score}]`
                )
              }
              const gameData = {
                // sec,
                // row: rowNum + 2,
                // elem: 0 + yr * 7,
                gameDate: pageRowElements[rowNum + 2 + wk][0 + yr * 7][0],
                gameSeason,
                gameWeek: wk,
                neutralGame,
                playoffGame: wk >= 12 && !divisionGame,
                tm1Loc,
                tm1Id,
                tm1Name,
                tm2Id,
                tm2Name,
                divisionGame,
                tm1Result: pageRowElements[rowNum + 2 + wk][4 + yr * 7][0],
                tm1Score,
                tm2Score
              }

              console.log('=============')
              // console.log(gameData)
            }
          }
        }
      }
    }
    // console.log(pageRowElements)
    // })
  })
}

getTeams('Inactive.htm')
// getTeams('index.htm')
client.close()

/*
const $ = await cheerio.load(response)
$('td[width=152] a').each((idx, ele) => {
  const $ele = $(ele)
  const teamId = $ele.attr('href').split('.')[0]
  const teamName = $ele.text()

  const teamDocument = {
    teamId,
    teamName,
    instate: true
  }
  data.push(teamDocument)
  // console.log(teamDocument)
})
console.log(data.length)
*/

/*
const uri =
  'mongodb+srv://admin:admin@cluster0-4yyve.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
client.connect(async err => {
  const db = client.db('football')
  const dbCollection = db.collection('teams')
  // perform actions on the collection object
  console.log(dbCollection)
  client.close()
})
*/
