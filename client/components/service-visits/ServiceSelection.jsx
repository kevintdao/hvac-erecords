import { Temporal } from '@js-temporal/polyfill'
import React from 'react'

export default function ServiceSelection ({ register, errors, task, index, name, onChange }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    radio_button: 'form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer',
    helpText: 'text-sm text-red-700 mt-1',
  }
  const choices = getChoices(task.rule.options)

  function getChoices(options) {
    let output = []

    for(const key in options) {
      if(key != 'choices') {
        output.push(options[key])
      }
    }

    return output
  }

  return (
    <div className={styles.inputContainer}>
      {choices.map((item, i) => (
        <label key={`selection-${index+1}-${i+1}`}>
          <input type='radio' name={index+1} id={`task-${index+1}-${i+1}`} value={i+1}
            className={`${styles.radio_button} ${errors[task.id]?.value ? 'border-red-400' : 'border-gray-300'}`}
            {...register(`${task.id}.value`, {
              required: {
                value: true,
                message: 'Please select one of the options'
              },
              onChange: (e) => onChange(task.id, name, e)
            })}
          />
          {item}
        </label>
      ))}
      <input type='hidden' name='selection' {...register(`${task.id}.type`)} value='Selection' />
      <span className='text-sm text-red-700 mt-1' id={`task-${index+1}-help`}>{errors[task.id]?.value.message}</span>
    </div>
  )
}
