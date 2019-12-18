const { MongoClient } = require('mongodb')
const axios = require('axios')

// const cheerio = require('cheerio')

const parseTeams = require('./parseTeams')

/* function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
} */

const main = async () => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    'mongodb+srv://admin:admin@cluster0-4yyve.mongodb.net/test?retryWrites=true&w=majority'

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect to the MongoDB cluster
    await client.connect()
    // Make the appropriate DB calls

    console.log('Connected...')
    parseTeams()

    // const url = 'http://misshsfootball.com/Teams/index.htm'
    // const url = 'http://misshsfootball.com/Teams/Inactive.htm'
    // const url = 'http://misshsfootball.com/Teams/Aberdeen_Standings.htm'
    // const url = 'http://misshsfootball.com/Teams/Aberdeen_Scores.htm'

    // const pageData = await scrapePage(url)

    // const $ = cheerio.load(pageData)

    // pageData.forEach(row => {
    //   console.log(row.length)
    // })
    /*
    const pageData = []
    $tr.each((i, row) => {
      const rowData = []
      if (i > 5 && i < $tr.length - 3) {
        $(row)
          .children()
          .each(i => {
            if (i > 0 && i < $(row).children().length - 1) {
              rowData.push(cleanText($($(row).children()[i]).text()))
            }
          })
        pageData.push(rowData)
        console.log(rowData[0])
      }
    })
    console.log(pageData)
    console.log('Length:', pageData.length)
    */
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
    console.log('Disconnected')
  }
}

main().catch(console.err)
