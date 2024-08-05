import { useState } from "react"
import { useUserContext } from "./useUserContextHook"
import { useRouter } from "next/navigation"


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useUserContext()
    const router = useRouter()

    const login = async (emailAddress, password) => {
        setIsLoading(true);
        setError(null)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailAddress, password })
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
    return { login, isLoading, error }
}
