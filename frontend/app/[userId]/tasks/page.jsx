"use client"

import React from 'react'
import TaskForm from '@/components/TaskForm'
import { useUserContext } from '@/hooks/useUserContextHook'
import { useTaskContext } from '@/hooks/useTaskContext'
import Task from '@/components/Task'
import Link from 'next/link'

const Page = () => {
    const { tasks } = useTaskContext()
    const { user } = useUserContext()

    return (
        <div className='py-10 px-6 md:px-10 lg:px-20 grow'>
            <h2 className='headline mb-6'>Your tasks</h2>
            <Link href={`/${user?._id}`} className="primary_btn">Back</Link>
            <div className='flex flex-col md:justify-center md:items-center lg:flex-row gap-5 md:gap-10 lg:gap-20 mt-5'>
                <div>
                    {tasks && tasks.map((task) => (
                        <Task task={task} key={task._id} />
                    ))}
                </div>
                <TaskForm />
            </div>
        </div>
    )
}

export default Page