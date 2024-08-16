import React from 'react'

const FormField = ({ field }) => {
    return (
        <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
                type={field.type}
                placeholder={field.placeholder}
                name={field.id}
                id={field.id}
                onChange={field.handleChange}
                value={field.value}
                min={field?.min}
                className={field?.style}
            />
        </div>
    )
}

export default FormField
