import express from 'express'
import fileUpload from 'express-fileupload'
import {config} from './config/default.js'
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js'
import fileRouter from './routes/file.routes.js'
import {corsMiddleware} from "./middleware/cors.middleware.js";
import {filePath} from "./middleware/file.middleware.js";
import {fileURLToPath} from 'url'
import path from "path";

const app = express()
const PORT = config.serverPort

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filePath(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'files')))
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
    try {

        await mongoose.connect(config.mongoURI)

        app.listen(PORT, () => {
            console.log('server started on port', PORT)
        })

    }
    catch (e) {
        console.log(e);
    }
}

start()


