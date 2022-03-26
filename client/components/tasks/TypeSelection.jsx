import React, { useState } from 'react'

export default function TypeSelection ({ register, errors, number, ...rest }) {
  var rows = []
  for(let i = 0; i < number; i++) rows.push(i)

  const styles = {
    inputContainer: 'flex flex-col space-y-2 mt-2',
    input: 'p-2 border rounded',
  }

  if (number == 0 || number == null) {
    return (
      <></>
    )
  }

  return (
    <div className={styles.inputContainer}>
      <label htmlFor='choices'>Choices</label>
      {rows.map((items, index) => (
        <div key={index} className={styles.inputContainer}>
          <input type='text' name={`${index + 1}`} id={`${index + 1}`} 
            className={`${styles.input} ${errors[`choice${index}`] ? 'border-red-400' : 'border-gray-300'}`}
            {...register(`selection.${index + 1}`, {
              required: {
                value: true,
                message: `Enter a value for choice-${index + 1}`
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id='description-help'>{errors[`${index + 1}`]?.message}</span>
        </div>
      ))}
    </div>
  )
}
