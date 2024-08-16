import React from 'react'
import { useState } from 'react'
import { useTaskContext } from '@/hooks/useTaskContext'
import { useUserContext } from '@/hooks/useUserContextHook'
import Button from './Button'
import TaskEditForm from './TaskEditForm'

const Task = ({ task }) => {
    const { dispatch } = useTaskContext()
    const { user } = useUserContext()
    const [edit, setEdit] = useState(false)

    const handleDelete = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BACKEND}/tasks/${task._id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Omar ${user?.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: json })
        }
    }
    return (
        <div className='rounded-lg py-5 px-6 shadow-md'>
            {edit ? <TaskEditForm setEdit={setEdit} previousTask={task} /> :
                <div className='flex gap-10 justify-between w-full lg:w-auto'>
                    <div>
                        <h3 className='font-medium font-dmSans text-xl md:text-2xl lg:text-3xl'>{task.text}</h3>
                        <div className='flex gap-5 mt-4'>
                            <p className='task_info'>{`Start: ${task.start_date.slice(0, 10)}`}</p>
                            <p className='task_info'>{`Duration: ${task.duration}`}</p>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <Button altText="Edit" file="/brush.svg" style="btn_svg" handleClick={() => setEdit(true)} />
                        <Button altText="Delete" file="/trash.svg" style="btn_svg" handleClick={handleDelete} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Task