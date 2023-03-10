import { Temporal } from '@js-temporal/polyfill'
import React from 'react'

export default function ServiceText ({ register, errors, task, index, name, onChange }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    helpText: 'text-sm text-red-700 mt-1',
  }

  return (
    <div className={styles.inputContainer}>
      <textarea id={`task-${index+1}`} className={`${styles.input} ${errors[task.id]?.value ? 'border-red-400' : 'border-gray-300'}`}
        {...register(`${task.id}.value`, {
          required: {
            value: true,
            message: 'This field is required'
          },
          onChange: (e) => onChange(task.id, name, e)
         })}
      >
      </textarea>
      <input type='hidden' name='text' {...register(`${task.id}.type`)} value='Text' />
      <span className='text-sm text-red-700 mt-1' id={`task-${index+1}-help`}>{errors[task.id]?.value.message}</span>
    </div>
  )
}
