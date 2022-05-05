import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProfileForm ({ type, tasks, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, unregister } = useForm()
  const [tasksList, setTasksList] = useState([{ task_id: tasks[0]?.id }])

  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    inputs2Cols: 'grid md:grid-cols-2 gap-4 grid-cols-1',
    helpText: 'text-sm text-red-700 mt-1',
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    addButton: 'p-2 bg-green-700 rounded text-white text-center hover:bg-green-800',
    deleteButton: 'p-2 bg-red-700 rounded text-white text-center hover:bg-red-800'
  }

  const addTask = () => {
    setTasksList([...tasksList, { task_id: tasks[0].id }])
  }

  const deleteTask = (index) => {
    const list = [...tasksList]
    list.splice(index, 1)

    for(let i = 0; i < tasksList.length; i++){
      unregister(`tasks.t${i}`)
    }

    setTasksList(list)
  }

  const changeTask = (e, index) => {
    const list = [...tasksList]
    list[index].task_id = parseInt(e.target.value)
    setTasksList(list)
  }

  return (
    <>
      <form action='' method='post' onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-2'>
        {/* Title */}
        <div className={styles.inputContainer}>
          <label htmlFor='title'>Title</label>
          <input 
            type='text'
            id='title'
            name='title'
            className={`${styles.input} ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
            {...register('title', {
              required: {
                value: true,
                message: 'Enter a title'
              }
            })}           
          />
          <span className='text-sm text-red-700 mt-1' id='title-help'>{errors.title?.message}</span>
        </div>

        {/* Description */}
        <div className={styles.inputContainer}>
          <label htmlFor='description'>Description</label>
          <textarea name='description' id='description' cols='10' rows='4' 
            className={`${styles.input} ${errors.description ? 'border-red-400' : 'border-gray-300'} resize-none`}
            {...register('description', {
              required: {
                value: true,
                message: 'Enter a description'
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id='description-help'>{errors.description?.message}</span>
        </div>

        {/* Tasks */}
        <div className='space-y-2'>
          <label htmlFor='tasks'>Tasks</label>
          {tasks.length == 0 && <div>No tasks</div>}
          {tasks.length != 0 && tasksList.map((item, index) => (
            <div className='flex flex-row space-x-2' key={index}>
              <select name={`tasks.t${index}`} id={`tasks.t${index}`} value={item.task_id} className={`${styles.input} border-gray-300 ${tasksList.length > 1 ? 'basis-5/6' : 'basis-full'}`} 
                {...register(`tasks.t${index}`, {
                  onChange: (e) => changeTask(e, index)
                })}
              >
                {tasks.map((item, index) => (
                  <option value={item.id} key={item.id}>{`${item.title} (${item.rule.type})`}</option>
                ))}
              </select>
              {tasksList.length > 1 && <button type='button' className={`${styles.deleteButton} basis-1/6`} id={`delete${index}`} onClick={() => deleteTask(index)}>Delete</button>}
            </div>
          ))}
          {tasks.length != 0 && <button type='button' className={styles.addButton} onClick={addTask} id='add-task'>Add Task</button>}
        </div>

        {tasks.length != 0 && <button className={styles.button} id='create-button'>{type}</button>}
      </form>
    </>
  )
}
