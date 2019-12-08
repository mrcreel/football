const fetch = require('node-fetch')
const cheerio = require('cheerio')

const teamSeasonData = []

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

  for (let r = 0; r < 4; r++) {
    teamSeasonData.push({
      teamId,
      teamSeason: teamScoresPageElements[0][r],
      teamName: teamScoresPageElements[1][r].replace(/(\r\n|\n|\r) /gm, ''),
      teamMasot: teamScoresPageElements[2][r].replace(/(\r\n|\n|\r) /gm, ''),
    })
  }
  console.log(teamSeasonData)
}

getTeamScores('Westharrison')
