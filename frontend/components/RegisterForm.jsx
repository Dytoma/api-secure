"use client"

import { useRegister } from '@/hooks/useRegister'
import { useRegisterFields } from '@/hooks/useFields'
import FormField from './FormField'

const RegisterForm = () => {
    const { register, error, isLoading } = useRegister()
    const { firstName, lastName, email, password, fields } = useRegisterFields()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(firstName, lastName, email, password)
    }

    return (
        <div className='mt-6 mb-3 md:mt-12 md:mb-6'>
            <form className='form_col' onSubmit={handleSubmit}>
                {fields.map((field) => <FormField field={field} key={field.id} />)}
                <button type='submit' className='submit_btn btn_hover' disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>
                {error && <p className='paragraph_text error'>{error}</p>}
            </form>
        </div>
    )
}

export default RegisterForm
