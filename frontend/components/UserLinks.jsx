"use client"

import { useState } from 'react'
import { useLogout } from '@/hooks/useLogout'
import Link from 'next/link'
import Image from 'next/image'
import ConfirmationMessage from './ConfirmationMessage'

const UserLinks = ({ path }) => {
    const { logout } = useLogout()
    const [message, setMessage] = useState(false)

    const handleDelete = () => {
        setMessage(true)
    }
    return (
        <div className='flex md:flex-col gap-4 side_links'>
            <Link href={`${path}/update`} title='Update'>
                <Image src='/user-edit.svg' width={34} height={53} alt='Update' />
            </Link>
            <button title='Delete user' onClick={handleDelete}>
                <Image src='/profile-delete.svg' width={34} height={53} alt='Delete' />
            </button>
            <button title='Logout' onClick={() => logout()}>
                <Image src='/logout.svg' width={34} height={53} alt='Logout' />
            </button>
            {message && <ConfirmationMessage setMessage={setMessage} />}
        </div>
    )
}

export default UserLinks
