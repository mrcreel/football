const fs = require('fs')

// /home/michael/projects/football/scrapers/data/seasons.json

const writeJson = async (data, fileName) => {
  await fs.writeFile(
    `./scrapers/data/${fileName}.json`,
    JSON.stringify(data),
    err => {
      if (err) {
        console.log(err)
      } else {
        console.log('Written')
      }
    }
  )
}

module.exports = writeJson
