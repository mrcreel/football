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

const pages = ["/Teams/index.htm", "/Teams/Inactive.htm"]

const scrapeData = async pages => {
  const data = []

  await asyncForEach(pages, async page => {
    const url = `${BASE_URL}${page}`

    const $ = cheerio.load(fs.readFileSync(url))

    console.log($)
  })
}

scrapeData(pages)
