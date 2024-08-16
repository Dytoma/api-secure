import FormField from './FormField'
import { useTaskEdit } from '@/hooks/useFields'
import { useTaskUpdate } from '@/hooks/useTaskHooks'
import Error from './Error'

const TaskEditForm = ({ setEdit, previousTask }) => {
    const { fields, task, setTask } = useTaskEdit(previousTask)
    const { updateTask, error, isLoading } = useTaskUpdate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        updateTask(task)
        if (error && !isLoading) {
            setEdit(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
                    {fields.map((field) => <FormField field={field} key={field._id} />)}
                </div>
                <div className='flex gap-5 my-4'>
                    <button onClick={() => setEdit(false)} className='cancel_edit_btn'>Cancel</button>
                    <button type='submit' className='continue_edit_btn'>{isLoading ? 'saving...' : 'Edit'}</button>
                </div>
                {error && <Error error={error} />}
            </form>
        </div>
    )
}

export default TaskEditForm