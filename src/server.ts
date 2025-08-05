import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import router from './routes'
import { connectDB } from './config/db'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/api', router)

export default app