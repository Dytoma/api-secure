import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import router from './routes/users.js'


dotenv.config()

const app = express()

app.use(cors())

// Parser les requetes en format JSON
app.use(express.json())

// utilisation des routes
app.use('/', router)

// se connecter à la base de donnée
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // Ecoute des requêtes
        app.listen(process.env.PORT, () => {
            console.log(`Connnected to db & Listening on port ${process.env.PORT}`)
        })
    })
    .catch(error => console.log(error))

