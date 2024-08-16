import express from 'express'
import { requireLogin } from '../middleware/requireLogin.js'
import { getAllTasks, getSingleTask, updateTask, deleteTask, createNewTask } from '../controllers/taskController.js'

const taskRouter = express.Router()


taskRouter.use('/', requireLogin)

taskRouter.get('/', getAllTasks)

taskRouter.post('/', createNewTask)

taskRouter.get('/:id', getSingleTask)

taskRouter.patch('/:id', updateTask)

taskRouter.delete('/:id', deleteTask)

export default taskRouter
