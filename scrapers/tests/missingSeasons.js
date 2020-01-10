const axios = require('axios')
const cheerio = require('cheerio')

const teams = require('../data/teams.json')
const seasons = require('../data/seasons.json')

const writeJson = require('../functions/writeJson')

teams.forEach(team => {
  const tmId = team.teamId

  const findSeason = seasons.find(({ teamId }) => teamId === `${tmId}`)
  if (typeof findSeason == 'undefined') {
    console.log(tmId, typeof findSeason)

    const page = `http://misshsfootball.com/Teams/${tmId}_Standings.htm`

    const response = axios.get(page)
    const body = response.data

    const $ = cheerio.load(body)
    const data = $(`tr`)

    let $data = $(data)

    $data = $data.slice(8, $data.length - 5)

    $data.each((index, element) => {
      const rowData = $(element).children()
      const teamSeason = parseInt($(rowData[1]).text())
      // const teamRegion = cleanText($(rowData[2]).text())
      // console.log(`-->: Season: ${teamSeason} | ${teamRegion}`)

      const teamSeasonData = {
        teamId,
        teamSeason,
        Season: parseInt(teamSeason)
      }
      seasons.push(teamSeasonData)
    })
    writeJson(seasons, 'seasons')
  }
})
