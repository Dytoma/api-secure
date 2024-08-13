import express from 'express'
import { requireLogin } from '../middleware/requireLogin.js'
import { updateUser, deleteUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.use('/update', requireLogin)
userRouter.use('/delete', requireLogin)

userRouter.put('/update', updateUser)

userRouter.delete('/delete', deleteUser)

export default userRouter
