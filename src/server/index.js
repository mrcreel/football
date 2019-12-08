const fetch = require('node-fetch')
const cheerio = require('cheerio')
const uuidv4 = require('uuid/v4')

const teamsSeasonData = []
const gamesData = []

const getTeamScores = async teamId => {
  const url = `http://misshsfootball.com/Teams/${teamId}_Scores.htm`
  const response = await fetch(url)
  const body = await response.text()

  const $ = cheerio.load(body)

  let teamScoresPageRows = $('tr')
  teamScoresPageRows = teamScoresPageRows.slice(
    6,
    teamScoresPageRows.length - 3
  )
  const teamScoresPageElements = []

  for (let row = 0; row < teamScoresPageRows.length; row++) {
    let rowElements = []
    $(teamScoresPageRows[row])
      .children()
      .each((idx, td) => {
        rowElements.push($(td).text())
      })
    rowElements = rowElements.slice(1, rowElements.length - 1)
    teamScoresPageElements.push(rowElements)
  }
  console.log(`${teamId}: ${teamScoresPageElements.length}`)

  const teamScoresPageSections = teamScoresPageElements.length / 20

  for (let sec = 0; sec < teamScoresPageSections; sec++) {
    for (let yr = 0; yr < 4; yr++) {
      const teamSeasonName = teamScoresPageElements[sec * 20 + 1][yr].replace(
        /(\r\n|\n|\r) /gm,
        ''
      )

      const teamSeasonGames = []
      if (teamSeasonName.length !== 1) {
        const season = parseInt(teamScoresPageElements[sec * 20][yr])
        for (let gm = 4; gm < 20; gm++) {
          /* */
          const tm1Score = parseInt(
            teamScoresPageElements[sec * 20 + gm][5 + yr * 7]
          )
          if (!isNaN(tm1Score)) {
            const gameId = uuidv4()
            const gameDate = new Date(
              teamScoresPageElements[sec * 20 + gm][0 + yr * 7]
            )
            const tm1Id = teamId
            const tm2id = ''
            const tm1Loc = teamScoresPageElements[sec * 20 + gm][1 + yr * 7]
            const gameNeutral = tm1Loc == 'N'
            const tm1Name = teamSeasonName
            const tm2Name = teamScoresPageElements[sec * 20 + gm][
              2 + yr * 7
            ].replace(/(\r\n|\n|\r) /gm, '')
            const gameDivision =
              teamScoresPageElements[sec * 20 + gm][3 + yr * 7] == '*'

            const tm2Score = parseInt(
              teamScoresPageElements[sec * 20 + gm][6 + yr * 7]
            )

            /* */
            let teamm1Id = tm1Id
            let team1Name = tm1Name
            let team1Score = tm1Score
            let gameLocation = tm1Loc
            let team2Id = tm2id
            let team2Name = tm2Name
            let team2Score = tm2Score
            /* */
            /* swap things around for road/neutral games */
            if (tm1Loc == 'A') {
              console.log('AWAY Game')
              gameLocation = 'H'
              teamm1Id = ''
              team1Name = tm2Name
              team2Id = tm1Id
              team2Name = tm1Name
              team1Score = tm2Score
              team2Score = tm1Score
            }

            /* */

            if (tm2Name.length !== 1) {
              const teamSeasonGame = {
                // test: tm2Name.length,
                gameId,
                gameSeason: season,
                gameWeek: gm - 3,
                gameDate,
                gameLocation,
                gameNeutral,
                gameDivision,
                teamm1Id,
                team1Name,
                team1Score,
                team2Id,
                team2Name,
                team2Score,
                gameTie: team1Score == team2Score,
                team1Win: team1Score > team2Score,
              }

              console.log(teamSeasonGame)

              gamesData.push(teamSeasonGame)

              teamSeasonGames.push(teamSeasonGame) // Change this to gameId when I can figure out how to link tables
            }
          }
        }

        const seasonData = {
          url,
          season,
          teamId,
          teamSeason: teamScoresPageElements[sec * 20][yr],
          teamSeasonName,
          teamSeasonMascot: teamScoresPageElements[sec * 20 + 2][yr].replace(
            /(\r\n|\n|\r) /gm,
            ''
          ),
          teamSeasonDivision: '',
          teamSeasonClass: '',
          teamSeasonGames,
        }
        console.log(seasonData)
        teamsSeasonData.push(seasonData)
        console.log('')
      }
    }
    console.log('---------')
  }
  console.log('---------')
  // console.log('teamsSeasonData')
  // console.log('-->', teamsSeasonData)
  // console.log('-->', gamesData)
  // console.log('gamesData')
}
// getTeamScores('Alcorncentral')
getTeamScores('Ashland')
// getTeamScores('Bassfield')
// getTeamScores('Greenecounty')
// getTeamScores('Stone')
