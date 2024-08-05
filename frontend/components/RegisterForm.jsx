"use client"

import {useState} from 'react'

import { useRegister } from '@/hooks/useRegister'

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register, error, isLoading} = useRegister()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(firstName, lastName, email, password)
        await register(firstName, lastName, email, password)
    }

    return (
        <div className='mt-6 mb-3 md:mt-12 md:mb-6'>
            <form className='form_col' onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-7'>

                    <div className='grow w-full md:w-auto'>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            placeholder='Dytoma'
                            name='firstName'
                            id='firstName'
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </div>

                    <div className='grow w-full md:w-auto'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            placeholder='Omar'
                            name='lastName'
                            id='lastName'
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </div>

                </div>

                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        placeholder='username@gmail.com'
                        name='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        placeholder='*****'
                        name='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button type='submit' className='submit_btn btn_hover' disabled={isLoading}>Register</button>
                {error && <p className='paragraph_text error'>{error}</p>}
            </form>
        </div>
    )
}

export default RegisterForm
