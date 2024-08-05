import { UsersContext } from "./UserContext"
import { useContext } from "react"

export const useUserContext = () => {
    const context = useContext(UsersContext)

    if (!context) {
        throw Error('useUserContext must be used inside the context provide component')
    }
    return context
}
