const cheerio = require("cheerio")
const fs = require("fs")

// Page of active teams
const activeTeamsPage =
  "/home/michael/projects/msprepfb/scraper/data/Teams/index.htm"

// Page of inActive teams
const inactiveTeamsPage =
  "/home/michael/projects/msprepfb/scraper/data/Teams/Inactive.htm"

// Page for individual team yearly scores
const teamScoresPage =
  "/home/michael/projects/msprepfb/scraper/data/Teams/Alcorncentral_Scores.htm"

// Page for individual team yearly standings
const teamStandingsPage =
  "/home/michael/projects/msprepfb/scraper/data/Teams/Alcorncentral_Standings.htm"

/* Begin scraping the page of active teams*/

// Use fs to access a local file, then cheerio to import it into memory
const $active = cheerio.load(fs.readFileSync(inactiveTeamsPage))

console.log("scraper")
