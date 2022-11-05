const express = require('express')
const path = require('path')
const PORT = process.env.APP_PORT
const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
app.get ('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(PORT)