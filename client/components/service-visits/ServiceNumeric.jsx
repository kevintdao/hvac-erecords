import { Temporal } from '@js-temporal/polyfill'
import React from 'react'

export default function ServiceNumeric ({ register, errors, task, index, name, onChange }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    helpText: 'text-sm text-red-700 mt-1',
  }

  const min = task.rule.options?.min && {
    value: task.rule.options.min,
    message: `Value must be greater than or equal to ${task.rule.options.min}`
  }

  const max = task.rule.options?.max && {
    value: task.rule.options?.max,
    message: `Value must be less than or equal to ${task.rule.options.max}`
  }

  return (
    <div className={styles.inputContainer}>
      {task.rule.options?.min && <label className='text-gray-500'>
        {`Minimum value: ${task.rule.options?.min}`}
      </label>}
      {task.rule.options?.max && <label className='text-gray-500'>
        {`Maximum value: ${task.rule.options?.max}`}
      </label>}
      <input type='number' id={`task-${index+1}`} 
        className={`${styles.input} ${errors[task.id]?.value ? 'border-red-400' : 'border-gray-300'}`}
        {...register(`${task.id}.value`, {
          required: {
            value: true,
            message: 'This field is required'
          },
          min,
          max,
          onChange: (e) => onChange(task.id, name, e)
        })}
      />
      <input type='hidden' name='numeric' {...register(`${task.id}.type`)} value='Numeric' />
      <span className='text-sm text-red-700 mt-1' id={`task-${index+1}-help`}>{errors[task.id]?.value.message}</span>
    </div>
  )
}
