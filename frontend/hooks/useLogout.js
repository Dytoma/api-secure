import { useTaskContext } from "./useTaskContext"
import { useUserContext } from "./useUserContextHook"
import { useRouter } from "next/navigation"


export const useLogout = () => {
    const { dispatch } = useUserContext()
    const { dispatch: taskDispatch } = useTaskContext()
    const router = useRouter()

    const logout = async () => {
        localStorage.removeItem('user')

        router.push('/login')
        dispatch({ type: 'LOGOUT' })
        taskDispatch({ type: 'SET_TASKS', payload: null })
    }

    return { logout }
}
