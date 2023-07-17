const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
const cors = require('cors')
//autapp.use(bodyparser.json());

app.use(express.json())
app.use(
  cors({
    origin: '*',
  }),
)
const appModule = require('./appmodule')
const port = 4500 // Set your desired port number
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/api', (req, res) => {
  res.send('true')
})
appModule(app)
app.listen(port, () => {
  console.log(`Server runniang on port ${port}`)
})
