import express from 'express'
import path from 'path'
import {fileURLToPath} from "url";

const PORT = process.env.APP_PORT
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
app.get ('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(PORT)