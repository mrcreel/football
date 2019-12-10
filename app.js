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
      const teamName = $ele.text()

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
    const teamId = 'Stone'
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
        const teamName = pageRowElements[rowNum + 1][0 + yr][0]
        const teamMascot = pageRowElements[rowNum + 2][0 + yr][0]
        const teamYear = {
          sec,
          rowNum,
          teamSeason,
          teamName,
          teamMascot
        }
        console.log(teamYear)
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
