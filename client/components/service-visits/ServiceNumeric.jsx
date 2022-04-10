import React from 'react'

export default function ServiceNumeric ({ register, errors, task, index }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    helpText: 'text-sm text-red-700 mt-1',
  }

  return (
    <div className={styles.inputContainer}>
      <label className='text-gray-500'>{`Minimum value: ${task.rule.options.min} | Maximum value: ${task.rule.options.max}`}</label>
      <input type='number' min={task.rule.options.min} max={task.rule.options.max} id={`task-${index+1}`} 
        className={`${styles.input} ${errors[task.id] ? 'border-red-400' : 'border-gray-300'}`}
        {...register(`${task.id}`, {
          required: {
            value: true,
            message: 'This field is required'
          }
        })}
      />
      <span className='text-sm text-red-700 mt-1' id='title-help'>{errors[task.id]?.message}</span>
    </div>
  )
}
