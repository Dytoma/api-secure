"use client"

import React from 'react'
import { useLogin } from '@/hooks/useLogin'
import { useLoginFields } from '@/hooks/useFields'
import FormField from './FormField'
import Error from './Error'

const LoginForm = () => {
  const { login, isLoading, error } = useLogin()
  const { fields, email, password } = useLoginFields()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className='mb-10 mt-8 md:mb-20 md:mt-16'>
      <form className='form_col' onSubmit={handleSubmit}>

        {fields.map((field) => <FormField field={field} key={field.id} />)}

        <button type='submit' className='submit_btn btn_hover' disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
        {error && <Error error={error} />}
      </form>
    </div>
  )
}

export default LoginForm