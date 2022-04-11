import { Temporal } from '@js-temporal/polyfill'
import React from 'react'

export default function ServiceText ({ register, errors, task, index, name }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    helpText: 'text-sm text-red-700 mt-1',
  }

  const onChange = (e) => {
    let obj = JSON.parse(localStorage.getItem(name))
    let key = {
      value: e.target.value,
      completed_at: Temporal.Now.instant().round('second').toString()
    }
    obj[task.id] = key
    localStorage.setItem(name, JSON.stringify(obj))
  }

  return (
    <div className={styles.inputContainer}>
      <textarea id={`task-${index+1}`} className={`${styles.input} ${errors[task.id]?.value ? 'border-red-400' : 'border-gray-300'}`}
        {...register(`${task.id}.value`, {
          required: {
            value: true,
            message: 'This field is required'
          },
          onChange: (e) => onChange(e)
         })}
      >
      </textarea>
      <input type='hidden' name='text' {...register(`${task.id}.type`)} value='Text' />
      <span className='text-sm text-red-700 mt-1' id={`task-${index+1}-help`}>{errors[task.id]?.value.message}</span>
    </div>
  )
}
