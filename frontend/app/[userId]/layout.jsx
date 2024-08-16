"use client"

import SideView from "@/components/SideView"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserContext } from "@/hooks/useUserContextHook"
import { useTaskContext } from "@/hooks/useTaskContext"
import { useFetchTasks } from "@/hooks/useTaskHooks"

export default function UserIdLayout({ children }) {
    const { user } = useUserContext()
    const router = useRouter()
    const { fetchTasks } = useFetchTasks()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [])

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div className="responsive_flex">
            <SideView viewText='' sideWidth='w-full md:w-24' />
            {children}
        </div>
    )
}
