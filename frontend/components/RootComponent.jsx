"use client"

import { UserContextProvider } from "@/context/UserContext";

const RootComponent = ({ children }) => {
    return (
        <UserContextProvider>
            <body>{children}</body>
        </UserContextProvider>
    )
}

export default RootComponent
