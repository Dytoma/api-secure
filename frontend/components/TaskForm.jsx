import React from 'react'

import { useTaskForm } from '@/hooks/useFields'
import { useTaskAdd } from '@/hooks/useTaskHooks'

import FormField from './FormField'
import Error from './Error'

const TaskForm = () => {
    const { fields, task, setTask } = useTaskForm()
    const { addTask, error, isLoading } = useTaskAdd()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await addTask({ ...task, parent: '0', progress: 0, order: 0 })
    }
    return (
        <form className='flex flex-col gap-5 w-full md:w-[50vh]' onSubmit={handleSubmit}>
            {fields.map((field) => <FormField field={field} key={field.id} />)}
            <button type='submit' className='submit_btn btn_hover' disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Task'}</button>
            {error && <Error error={error} />}
        </form>
    )
}

export default TaskForm