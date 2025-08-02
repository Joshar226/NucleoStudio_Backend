import express from 'express'
import dotenv from 'dotenv'
import appRoutes from './routes/appRoutes'
import cors from 'cors'
import { corsConfig } from './config/cors'

dotenv.config()

const server = express()

server.use(cors(corsConfig))
server.use(express.json())

server.use('/api/app', appRoutes)

export default server
