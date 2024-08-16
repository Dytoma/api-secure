"use client"

import { useEffect } from 'react'

import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import './Gantt.css'
import { useTaskContext } from '@/hooks/useTaskContext'
import { useTaskAdd, useTaskDelete, useTaskUpdate } from '@/hooks/useTaskHooks'

const Gantt = ({ tasks }) => {
    const { addTask } = useTaskAdd()
    const { deleteTask } = useTaskDelete()
    const { updateTask } = useTaskUpdate()

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1)
        const day = String(date.getDate() + 1)

        return `${year}-${month}-${day}`
    }

    const parseData = () => {
        if (tasks) {
            const res = tasks.map((task) => ({
                id: task._id,
                text: task.text,
                start_date: task.start_date.slice(0, 10),
                duration: task.duration,
                parent: task.parent,
                progress: task.progress,
                order: task.order
            }))

            return res
        } else {
            return []
        }
    }
    useEffect(() => {
        gantt.config.date_format = "%Y-%m-%d"
        gantt.init("gantt_here")
        gantt.parse({ data: parseData() })

        gantt.attachEvent("onAfterTaskAdd", (id, item) => {

            addTask({
                text: item.text,
                start_date: formatDate(item.start_date),
                duration: item.duration,
                parent: item.parent,
                progress: item.progress,
                order: item.order || 0
            })
        });

        gantt.attachEvent("onAfterTaskUpdate", (id, item) => {

            updateTask({
                _id: item.id,
                text: item.text,
                start_date: formatDate(item.start_date),
                duration: item.duration,
                parent: item.parent,
                progress: item.progress,
                order: item.order || 0
            })
        });

        gantt.attachEvent("onAfterTaskDelete", (id, item) => {
            deleteTask(item.id)
        });

        return () => {
            gantt.clearAll()
        }
    }, [tasks])

    return (
        <div id='gantt_here' className='gant_style'></div>
    )
}

export default Gantt