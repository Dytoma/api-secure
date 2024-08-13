import express from 'express'
import { loginUser, registerUser, getUsers } from '../controllers/userController.js'
import { requireLogin } from '../middleware/requireLogin.js'

const router = express.Router()

// require authentification on users route
router.use('/users', requireLogin)

router.post('/login', loginUser)

router.get('/users', getUsers)

router.post('/register', registerUser)

export default router
