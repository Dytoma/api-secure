import { useTaskContext } from "./useTaskContext"
import { useUserContext } from "./useUserContextHook"
import { useState } from "react"

export const useTaskAdd = () => {
    const { dispatch } = useTaskContext()
    const { user } = useUserContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const addTask = async (task) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/tasks`, {
            method: 'POST',
            body: JSON.stringify({...task, user_id: user?._id}),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Dytoma ${user?.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            setError(null)
            setIsLoading(false)
            dispatch({ type: 'CREATE_TASK', payload: json })
        } else {
            setError(json.error)
            console.log(json.error)
            setIsLoading(false)
        }
    }

    return { addTask, error, isLoading }
}

export const useTaskUpdate = () => {
    const { dispatch } = useTaskContext()
    const { user } = useUserContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const updateTask = async (task) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/tasks/${task._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ ...task, user_id: user?._id }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Dytoma ${user?.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            setError(null)
            setIsLoading(false)
            dispatch({ type: 'UPDATE_TASK', payload: json })
        } else {
            setError(json.error)
            setIsLoading(false)
        }
    }

    return { updateTask, error, isLoading }
}

export const useTaskDelete = () => {
    const { dispatch } = useTaskContext()
    const { user } = useUserContext()

    const deleteTask = async (_id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/tasks/${_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Delete ${user?.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: json })
        } else {
            console.log(json.error)
        }
    }

    return { deleteTask }
}

export const useFetchTasks = () => {
    const { dispatch } = useTaskContext()
    const { user } = useUserContext()

    const fetchTasks = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/tasks`, {
            method: 'GET',
            headers: {
                'authorization': `Dytoma ${user?.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_TASKS', payload: json })
        }
        console.log(json)
    }

    return { fetchTasks }
}
