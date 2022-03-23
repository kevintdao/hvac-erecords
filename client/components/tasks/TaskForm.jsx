import React from 'react'
import { useForm } from 'react-hook-form';

export default function TaskForm ({ type, data, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data
  })

  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    inputs2Cols: 'grid md:grid-cols-2 gap-4 grid-cols-1',
    helpText: 'text-sm text-red-700 mt-1',
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  return (
    <>
      <form action='' method='post' onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-2'>
        <div className={styles.inputs2Cols}>
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
            <input 
              type='text'
              id='description'
              name='description'
              className={`${styles.input} ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
              {...register('description', {
                required: {
                  value: true,
                  message: 'Enter a description'
                }
              })}           
            />
            <span className='text-sm text-red-700 mt-1' id='description-help'>{errors.description?.message}</span>
          </div>

          {/* Render fields from JSON file */}
        </div>

        <div>
          <button className={styles.button} id='create-button'>{type}</button>
        </div>
      </form>
    </>
  )
}
