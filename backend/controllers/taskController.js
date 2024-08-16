import { Task } from '../models/task.js'
import mongoose from 'mongoose'

export const getAllTasks = async (req, res) => {
    const user_id = req.user._id

    try {
        const tasks = await Task.find({ user_id }).sort({ createdAt: -1 })

        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createNewTask = async (req, res) => {
    const user_id = req.user._id
    const { text, start_date, duration } = req.body

    if (!text || !start_date || !duration) {
        return res.status(400).json({ error: "All fields must be filled" })
    }
    try {
        const task = await Task.create({ ...req.body, user_id })

        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getSingleTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No task found" })
    }
    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({ error: "No task found" })
    }
    res.status(200).json(task)
}


export const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No task found" })
    }
    const task = await Task.findOneAndDelete({ _id: id })

    if (!task) {
        return res.status(400).json({ error: "No task found" })
    }
    res.status(200).json(task)
}

export const updateTask = async (req, res) => {
    const { id } = req.params
    const {text, start_date, duration} = req.body

    if (!text || !start_date || !duration) {
        return res.status(400).json({error: "All fields must be filled"})
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No task found" })
    }
    const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!task) {
        return res.status(400).json({ error: "No task found" })
    }
    const newTask = await Task.findOne({ _id: id })
    res.status(200).json(newTask)
}
