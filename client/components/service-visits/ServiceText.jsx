import React from 'react'

export default function ServiceText ({ register, errors, task, index }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    helpText: 'text-sm text-red-700 mt-1',
  }

  return (
    <div className={styles.inputContainer}>
      <textarea className={`${styles.input} ${errors[task.id] ? 'border-red-400' : 'border-gray-300'}`}
        {...register(`${task.id}`, {
          required: {
            value: true,
            message: 'This field is required'
          }
        })}
      >
      </textarea>
      <span className='text-sm text-red-700 mt-1' id='title-help'>{errors[task.id]?.message}</span>
    </div>
  )
}
