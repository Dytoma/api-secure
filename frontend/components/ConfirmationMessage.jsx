import React from 'react'

import { useDeleteUser } from '@/hooks/useUpdate'
import { useUserContext } from '@/hooks/useUserContextHook'

const ConfirmationMessage = ({ setMessage }) => {
    const { remove, loading } = useDeleteUser()
    const { user } = useUserContext()

    return (
        <div className='fixed z-50 top-0 left-0 w-screen h-screen bg-zinc-700 bg-opacity-90 grid place-items-center'>
            <div className='py-10 px-10 rounded-xl bg-zinc-800'>
                <h2 className='text-base md:text-2xl text-white'>Do you really want to continue?</h2>
                <div className='flex items-center justify-center gap-4 mt-5'>
                    <button className='cancel_btn' onClick={() => setMessage(false)}>Cancel</button>
                    <button className='continue_btn' onClick={() => remove(user._id, user.token)}>{loading ? 'Deleting...' : 'Continue'}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationMessage
