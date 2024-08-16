import { useState } from "react"
import { useUserContext } from "./useUserContextHook"
import { useRouter } from "next/navigation"
import { useTaskContext } from "./useTaskContext"

export const useUpdate = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useUserContext()
    const router = useRouter()

    const update = async (data, _id, token) => {
        setIsLoading(true);
        setError(null)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/${_id}/update`, {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                'authorization': `Dytoma ${token}`
            },
            body: JSON.stringify({_id, ...data})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } else {
            localStorage.setItem("user", JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
            router.push(`/${json._id}`)
        }
    }
    return { update, isLoading, error }
}

export const useDeleteUser = () => {
    const [loading, setLoading] = useState(null)
    const { dispatch } = useUserContext()
    const { dispatch: taskDispatch } = useTaskContext()
    const router = useRouter()

    const remove = async (_id, token) => {
        setLoading(true);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/${_id}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Dytoma ${token}`
            },
            body: JSON.stringify({_id})
        })
        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
        } else {
            localStorage.removeItem("user")

            console.log(json.message)
            dispatch({ type: 'LOGOUT' })
            taskDispatch({ type: 'SET_TASKS', payload: null })
            setLoading(false)
            router.push('/login')
        }
    }
    return { remove, loading }
}
