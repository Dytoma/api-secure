import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import router from './routes/users.js'
import userRouter from './routes/userActions.js'
import taskRouter from './routes/tasks.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())

// Parser les requetes en format JSON
app.use(express.json())

// utilisation des routes
app.use('/', router)
app.use('/:user', userRouter)
app.use('/tasks', taskRouter)

// se connecter à la base de donnée
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // Ecoute des requêtes
        app.listen(PORT, () => {
            console.log(`Connnected to db & Listening on port ${PORT}`)
        })
    })
    .catch(error => console.log(error))

