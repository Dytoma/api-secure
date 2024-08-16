import { TasksContext } from "@/context/TaskContext";
import { useContext } from "react";

export const useTaskContext = () => {
    const context = useContext(TasksContext)

    if (!context) {
        throw Error("taskContext must be used inside the context provider")
    }
    return context
}
