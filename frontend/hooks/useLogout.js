import { useUserContext } from "./useUserContextHook"
import { useRouter } from "next/navigation"


export const useLogout = () => {
    const { dispatch } = useUserContext()
    const router = useRouter()

    const logout = async () => {
        localStorage.removeItem('user')

        router.push('/login')
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
