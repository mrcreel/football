const cheerio = require("cheerio")
const fs = require("fs")

const BASE_URL = "/home/michael/projects/football/src/data"

/** Function to be able to use Asyc/Await in a loop
 *
 * https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 *
 */
// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const pages = [
  // ["/Teams/index.htm", true],
  ["/Teams/Inactive.htm", false],
]

const scrapeData = async pages => {
  const data = []

  await asyncForEach(pages, async page => {
    const url = `${BASE_URL}${page[0]}`

    let $ = cheerio.load(fs.readFileSync(url))

    const ele = $("td[width=152] a")
    const $ele = $(ele[0])
    const teamId = $ele.attr("href").split(".")[0]

    // Get teamIds
    /*
    $("td[width=152] a").each((idx, ele) => {
      const $ele = $(ele)
      const teamId = $ele.attr("href").split(".")[0]
*/
    const seasonsUrl = `${BASE_URL}/Teams/${teamId}_Standings.htm`
    const teamSeasons = []

    $ = scrapePage($, seasonsUrl)

    $("td[width=76]").each((idx, ele) => {
      const $ele = $(ele)
      const teamYear = parseInt($ele.text())
      if (!isNaN(teamYear)) {
        const teamDivision = $ele
          .next()
          .text()
          .replace(/(\r\n|\n|\r) /gm, "")

        const splitDivision = teamDivision
          .split("-")
          .join(",")
          .split(" ")
          .join(",")
          .split(",")

        const teamClass =
          splitDivision.length >= 2 ? splitDivision[1] : splitDivision[0]

        teamSeason = {
          teamYear,
          teamDivision,
          teamClass,
        }
        teamSeasons.push(teamSeason)
      }
    })

    dataPoint = {
      teamId,
      inState: true,
      active: page[1],
    }
    // console.log(dataPoint)
    // console.log(teamSeasons)

    const scheduleUrl = `${BASE_URL}/Teams/${teamId}_Scores.htm`
    // console.log(scheduleUrl)

    $ = scrapePage($, scheduleUrl)
    const pageRows = $("tr").slice(6, $("tr").length - 3)
    const $pageRows = $(pageRows)

    console.log($pageRows.length)

    data.push(dataPoint)
    //    })
  })

  data.sort((a, b) => (a.teamId > b.teamId ? 1 : -1))

  // console.log(data)
}

scrapeData(pages)

function scrapePage($, url) {
  $ = cheerio.load(fs.readFileSync(url))
  return $
}
