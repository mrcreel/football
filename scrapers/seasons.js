const axios = require('axios')
const cheerio = require('cheerio')

const fs = require('fs')

require('dotenv').config()

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

function padNumber(number) {
  return number >= 100 ? number : number < 10 ? `00${number}` : `0${number}`
}

const writeJson = data => {
  fs.writeFile('./scrapers/data/seasons.json', JSON.stringify(data), err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Written')
    }
  })
}
let c = 1
const teams = require('./data/teams.json')
const scrapePage = async () => {
  let teamCount = 0
  teams.forEach(async team => {
    teamCount += 1
    const teamId = team.teamId
    const countDisplay = padNumber(teamCount)

    const page = `http://misshsfootball.com/Teams/${teamId}_Standings.htm`

    const response = await axios.get(page)
    console.log(
      `${padNumber(c)}: ${countDisplay})  ${teamId} -> ${response.status}`
    )
    c += 1
  })
}

scrapePage()
