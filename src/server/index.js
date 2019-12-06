const express = require('express')

const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(morgan('combined'))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'get / route',
  })
})

const PORT = process.env.PORT || 1337

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

console.log('app')
