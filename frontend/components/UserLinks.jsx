"use client"

import { useState } from 'react'
import { useLogout } from '@/hooks/useLogout'
import Link from 'next/link'
import Image from 'next/image'
import ConfirmationMessage from './ConfirmationMessage'
import Button from './Button'

const UserLinks = ({ path }) => {
    const { logout } = useLogout()
    const [message, setMessage] = useState(false)

    const handleDelete = () => {
        setMessage(true)
    }
    return (
        <div className='flex md:flex-col gap-4 side_links'>
            <Link href={`/${path}/tasks`} title='Access tasks' className='cursor-pointer'>
                <Image src='/task-square.svg' width={34} height={53} alt='Update' className='w-auto h-auto' />
            </Link>
            <Link href={`/${path}/update`} title='Update'>
                <Image src='/user-edit.svg' width={34} height={53} alt='Update' className='w-auto h-auto' />
            </Link>
            <Button altText="Delete account" style="" file="/profile-delete.svg" handleClick={handleDelete} />
            <Button altText="Logout" style="" file="/logout.svg" handleClick={() => logout()} />
            {message && <ConfirmationMessage setMessage={setMessage} />}
        </div>
    )
}

export default UserLinks
