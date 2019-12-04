// const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// https://stackoverflow.com/a/54925530
const readJson = file =>
  fs.readFileSync(__dirname + `/data/${file}.json`, { endoding: 'utf8' })
const teamsJson = JSON.parse(readJson('teams'))

// const seasonsJson = JSON.parse(readJson('seasons'))

// const BASE_URL = 'http://misshsfootball.com'
const BASE_URL = '/home/michael/projects/msprepfb/scraper/data'

/*
const scrapeTeams = async pages => {
  const data = []

  await asyncForEach(pages, async page => {
    const url = `${BASE_URL}${page}`

    // const response = await fetch(url)
    // const html = await response.text()

    // const $ = cheerio.load(html)

    const $ = cheerio.load(fs.readFileSync(url))

    $('td[width=152] a').each((idx, ele) => {
      const $ele = $(ele)

      const dataPoint = {
        teamId: $ele.attr('href').split('.')[0],
        teamName: $ele.text(),
        inState: true
      }

      data.push(dataPoint)
    })
  })
  //flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
  data.sort((a, b) => (a.teamId > b.teamId ? 1 : -1))

  // https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
  const jsonData = JSON.stringify(data)
  fs.writeFile('data/teams.json', jsonData, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })

  console.log(jsonData)
}
*/

const scrapeTeamDivisions = async () => {
  const data = []

  await asyncForEach(teamsJson, async teamJson => {
    const teamId = teamJson['teamId']
    const url = `${BASE_URL}/Teams/${teamId}_Standings.htm`

    // const response = await fetch(url)
    // const html = await response.text()

    // const $ = cheerio.load(html)

    const $ = cheerio.load(fs.readFileSync(url))

    console.log(url)

    $('td[width=76]').each((idx, ele) => {
      const $ele = $(ele)
      const teamYear = parseInt($ele.text())

      if (!isNaN(teamYear)) {
        const teamDivision = $ele
          .next()
          .text()
          .replace(/(\r\n|\n|\r) /gm, '')

        // https://www.geeksforgeeks.org/javascript-split-a-string-with-multiple-separators/

        const splitDivision = teamDivision
          .split('-')
          .join(',')
          .split(' ')
          .join(',')
          .split(',')

        const teamClass =
          splitDivision.length >= 2 ? splitDivision[1] : splitDivision[0]

        const teamSeason = {
          teamId,
          teamYear,
          teamDivision,
          teamClass
        }

        data.push(teamSeason)

        // console.log(teamSeason)
      }
    })
    // Add a delay to not spam site

    // await new Promise(resolve => setTimeout(resolve, 2000))
  })

  // https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824

  const jsonData = JSON.stringify(data)
  fs.writeFile('data/seasons.json', jsonData, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
}

/*
const scrapeGames = async () => {
  const gamesJson = []
  await asyncForEach(teamsJson, async teamJson => {
    const teamId = teamJson['teamId']
    const url = `${BASE_URL}/Teams/${teamId}_Scores.htm`

    const $ = cheerio.load(fs.readFileSync(url))

    console.log(url)

    //scrape all the rows on the page, then remove the first 6 and last 3
    const headerRows = 6 //Junk at the top
    const footerRows = 3 // Junk at the bottom

    let rawRows = $('tr')
    const $rawRows = $(
      rawRows.splice(headerRows, rawRows.length - (headerRows + footerRows))
    )

    const pageArray = []
    $rawRows.each((tr, rawRow) => {
      const rowArray = []

      const $rowChildren = $(rawRow).children()

      $rowChildren.each((td, rowChild) => {
        const $rowChild = $(rowChild)
        rowArray.push([$rowChild.text().replace(/(\r\n|\n|\r) /gm, '')])
      })
      pageArray.push(rowArray)
    })
    const teamYears = []
    for (let section = 0; section < pageArray.length; section += 20) {
      const teamArray = [teamId]

      for (let row = 0; row <= 19; row++) {
        if (row != 3) {
          pageArray[section + row] = pageArray[section + row].splice(
            1,
            pageArray[section + row].length - 2
          )
          const elementLength = pageArray[section + row].length / 4
          const game = []
          for (let ele = 0; ele < elementLength; ele++) {
            game.push(pageArray[section + row][ele])
          }
          if (row < 3) {
            teamArray.push(game[0][0])
          }

          if (row > 3) {
            if (!isNaN(parseInt(game[6][0]))) {
              const gameArray = {
                gameYear: teamArray[1],
                gameWeek: row - 3,
                rawDate: game[0][0],
                parsedDate: new Date(game[0][0]),
                team1Id: teamId,
                team1Name: teamArray[2],
                rawLoc: game[1][0],
                team2Id: '',
                team2Name: game[2][0],
                divisionGame: game[3][0],
                team1Result: game[4][0],
                team1score: game[5][0],
                team2score: game[6][0]
              }
              gamesJson.push(gameArray)
            }
          }
        }
      }

      const teamYear = {
        teamId: teamArray[0],
        teamYear: teamArray[1],
        teamName: teamArray[2],
        teamMascot: teamArray[3]
      }
      teamYears.push(teamYear)
    }

    // gamesJson.push(gamesArray)
  })
  const jsonData = JSON.stringify(gamesJson)

  fs.writeFile('data/games.json', jsonData, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
}
*/
// const pages = ['/Teams/index.htm', '/Teams/Inactive.htm']
// scrapeTeams(pages)
scrapeTeamDivisions()
// scrapeSeasons()
// scrapeGames()
