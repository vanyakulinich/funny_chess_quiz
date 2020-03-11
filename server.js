const express = require('express')
const path = require('path')

const PORT = 4000
const HOST = '0.0.0.0'
const server = express()
server.use(express.static(path.join(__dirname, 'build')))

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(PORT, HOST)
