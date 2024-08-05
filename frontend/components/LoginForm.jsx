"use client"

import React from 'react'
import { useState } from 'react'
import { useLogin } from '@/hooks/useLogin'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isLoading, error} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className='mb-10 mt-8 md:mb-20 md:mt-16'>
      <form className='form_col' onSubmit={handleSubmit}>

        <div>
          <label>Email Address</label>
          <input 
            type='email'
            placeholder='username@gmail.com'
            name='userName'
            id='userName'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <label htmlFor='passwd'>Password</label>
          <input
            type="password"
            placeholder='*****' 
            name='passwd'
            id='passwd'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type='submit' className='submit_btn btn_hover' disabled={isLoading}>Login</button>
        {error && <p className='paragraph_text error'>{error}</p>}
      </form>
    </div>
  )
}

export default LoginForm