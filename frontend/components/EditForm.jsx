"use client"

import React from 'react'
import { useUserContext } from '@/hooks/useUserContextHook'
import Link from 'next/link'
import { useUpdate } from '@/hooks/useUpdate'
import { useEditFields } from '@/hooks/useFields'
import FormField from './FormField'

const EditForm = () => {
    const { user } = useUserContext()
    const { update, isLoading, error } = useUpdate()
    const { fields, formFields } = useEditFields()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await update(formFields, user?._id, user?.token)
    }

    return (
        <div className='w-full px-6 py-10 md:py-0 md:px-0 md:w-[40vw]'>
            <form className='form_col w-full' onSubmit={handleSubmit}>

                {fields.map((field) => <FormField field={field} key={field.id} />)}

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