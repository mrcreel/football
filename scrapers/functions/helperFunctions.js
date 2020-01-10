function padNumber(number) {
  return number >= 100 ? number : number < 10 ? `00${number}` : `0${number}`
}

function cleanText(string) {
  return string.replace(/(\r\n|\n|\r) /gm, '')
}

function sleep(milliseconds) {
  var start = new Date().getTime()

  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break
    }
  }
}

module.exports = {
  padNumber,
  cleanText,
  sleep
}
