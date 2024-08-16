import { useState } from "react"
import { useUserContext } from "./useUserContextHook"

export const useLoginFields = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return ({
        fields: [
            {
                label: 'Email Address',
                type: 'email',
                placeholder: 'username@gmail.com',
                id: 'emailAddress',
                handleChange: (e) => {
                    setEmail(e.target.value)
                },
                value: email
            },
            {
                label: 'Password',
                type: 'password',
                placeholder: '*****',
                id: 'passwd',
                handleChange: (e) => {
                    setPassword(e.target.value)
                },
                value: password
            }
        ],
        email,
        password
    })
}

export const useRegisterFields = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return ({
        fields: [
            {
                label: 'First Name',
                type: 'text',
                placeholder: 'Dytoma',
                id: 'firstName',
                handleChange: (e) => {
                    setFirstName(e.target.value)
                },
                value: firstName
            },
            {
                label: 'Last Name',
                type: 'text',
                placeholder: 'Omar',
                id: 'lastName',
                handleChange: (e) => {
                    setLastName(e.target.value)
                },
                value: lastName
            },
            {
                label: 'Email Address',
                type: 'email',
                placeholder: 'username@gmail.com',
                id: 'email',
                handleChange: (e) => {
                    setEmail(e.target.value)
                },
                value: email
            },
            {
                label: 'Password',
                type: 'password',
                placeholder: '*****',
                id: 'password',
                handleChange: (e) => {
                    setPassword(e.target.value)
                },
                value: password
            }
        ],
        firstName,
        lastName,
        email,
        password
    })
}

export const useEditFields = () => {
    const { user } = useUserContext()
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
    }

    return ({
        fields: [
            {
                label: 'First Name',
                type: 'text',
                placeholder: 'Dytoma',
                id: 'firstName',
                handleChange: changeFormField,
                value: formFields.firstName
            },
            {
                label: 'Last Name',
                type: 'text',
                placeholder: 'Omar',
                id: 'lastName',
                handleChange: changeFormField,
                value: formFields.lastName
            },
            {
                label: 'Email Address',
                type: 'email',
                placeholder: 'username@gmail.com',
                id: 'email',
                handleChange: changeFormField,
                value: formFields.emailAddress
            },
            {
                label: 'Password',
                type: 'password',
                placeholder: '*****',
                id: 'password',
                handleChange: changeFormField,
                value: formFields.password
            },
            {
                label: 'New Password',
                type: 'password',
                placeholder: '*****',
                id: 'newPassword',
                handleChange: changeFormField,
                value: formFields.newPassword
            }
        ],
        formFields
    })
}

export const useTaskForm = () => {
    const [task, setTask] = useState({
        text: "",
        start_date: "",
        duration: ""
    })

    const changeFormField = (e) => {
        const { name, value } = e.target

        setTask({
            ...task,
            [name]: value
        })
    }
    const getCurrentDate = () => {
        const date = new Date()
        let currentDate = date.toJSON()

        return currentDate.slice(0, 10)
    }
    return ({
        fields: [
            {
                label: 'Name',
                type: 'text',
                placeholder: 'Do workout',
                id: 'text',
                handleChange: changeFormField,
                value: task.text
            },
            {
                label: 'Start Date',
                type: 'date',
                placeholder: '',
                min: getCurrentDate(),
                id: 'start_date',
                handleChange: changeFormField,
                value: task.start_date
            },
            {
                label: 'Duration',
                type: 'number',
                placeholder: '3',
                min: 1,
                id: 'duration',
                handleChange: changeFormField,
                value: task.duration
            },
        ],
        task,
        setTask
    })
}

export const useTaskEdit = (previousTask) => {
    const [task, setTask] = useState({...previousTask})

    const changeFormField = (e) => {
        const { name, value } = e.target

        setTask({
            ...task,
            [name]: value
        })
    }
    const inputStyle = "py-2 pl-2 md:py-4 md:pl-4 border-lightGrey border-2 rounded-lg w-fit"
    return ({
        fields: [
            {
                label: 'Name',
                type: 'text',
                placeholder: 'Do workout',
                id: 'text',
                handleChange: changeFormField,
                value: task.text,
                style: inputStyle
            },
            {
                label: 'Start Date',
                type: 'date',
                placeholder: '',
                id: 'start_date',
                handleChange: changeFormField,
                value: task.start_date.slice(0, 10),
                style: inputStyle
            },
            {
                label: 'Duration',
                type: 'number',
                placeholder: '3',
                min: 1,
                id: 'duration',
                handleChange: changeFormField,
                value: task.duration,
                style: inputStyle
            },
        ],
        task,
        setTask
    })
}
