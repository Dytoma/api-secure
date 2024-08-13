"use client"

import React from 'react'
import { useState } from 'react'
import { useUserContext } from '@/hooks/useUserContextHook'
import Link from 'next/link'
import { useUpdate } from '@/hooks/useUpdate'

const EditForm = () => {
    const { user } = useUserContext()
    const {update, isLoading, error} = useUpdate()

    const [formFields, setFormFields] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        emailAddress: user?.emailAddress || "",
        password: "",
        newPassword: ""
    })

    const changeFormField = (e) => {
        const { name, value } = e.target

        setFormFields({
            ...formFields,
            [name]: value
        })
        console.log(formFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await update(formFields, user?._id, user?.token)
    }

    return (
        <div className='w-full px-6 py-10 md:py-0 md:px-0 md:w-auto'>
            <form className='form_col w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-7'>

                    <div className='grow w-full md:w-auto'>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            placeholder='Dytoma'
                            name='firstName'
                            id='firstName'
                            onChange={changeFormField}
                            value={formFields.firstName}
                        />
                    </div>

                    <div className='grow w-full md:w-auto'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            placeholder='Omar'
                            name='lastName'
                            id='lastName'
                            onChange={changeFormField}
                            value={formFields.lastName}
                        />
                    </div>

                </div>

                <div>
                    <label htmlFor='emailAddress'>Email Address</label>
                    <input
                        type='email'
                        placeholder='username@gmail.com'
                        name='emailAddress'
                        id='email'
                        onChange={changeFormField}
                        value={formFields.emailAddress}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Last Password</label>
                    <input
                        type="password"
                        placeholder='*****'
                        name='password'
                        id='password'
                        onChange={changeFormField}
                        value={formFields.password}
                    />
                </div>

                <div>
                    <label htmlFor='newPassword'>New Password</label>
                    <input
                        type="password"
                        placeholder='*****'
                        name='newPassword'
                        id='newPassword'
                        onChange={changeFormField}
                        value={formFields.newPassword}
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                    <Link className='submit_btn btn_hover' href={`/${user?._id}`}>Cancel</Link>
                    <button type='submit' className='submit_btn btn_hover' disabled={isLoading}>{isLoading ? 'Loading...' : 'Update'}</button>

                </div>
                {error && <p className='paragraph_text error'>{error}</p>}
            </form>
        </div>
    )
}

export default EditForm