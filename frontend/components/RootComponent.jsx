"use client"

import { UserContextProvider } from "@/context/UserContext";
import { TasksContextProvider } from "@/context/TaskContext";

const RootComponent = ({ children }) => {
    return (
        <UserContextProvider>
            <TasksContextProvider>
                <body>{children}</body>
            </TasksContextProvider>
        </UserContextProvider>
    )
}

export default RootComponent
