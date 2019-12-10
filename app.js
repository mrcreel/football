const express = require('express')

const axios = require('axios')
const cheerio = require('cheerio')

const PORT = process.env.PORT || 3000

// Initialize Express
const app = express()

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Make public a static folder
app.use(express.static('public'))

// Simple index route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + './public/index.html'))
})

// Start the server
app.listen(PORT, function() {
  console.log('App listening on port ' + PORT)
})
