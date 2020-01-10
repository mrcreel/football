const axios = require('axios')
const cheerio = require('cheerio')

require('dotenv').config()

const writeJson = require('./functions/writeJson')
const { cleanText, padNumber, sleep } = require('./functions/helperFunctions')

const teams = require('./data/teams.json')

const scrapePage = async teamId => {
  const page = await `http://misshsfootball.com/Teams/${teamId}_Standings.htm`
  const response = await axios.get(page)
  await console.log(`${padNumber(ct)}: ${teamId} => ${response.status}`)
}

let ct = 1
teams.forEach(async team => {
  const teamId = team.teamId
  await scrapePage(teamId)
  sleep(1000)
  ct++
})
