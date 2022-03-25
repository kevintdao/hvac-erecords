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
        <>
          <input type='text' key={index} name={`choice-${index}`} id={`choice-${index}`} 
            className={`${styles.input} ${errors[`choice${index}`] ? 'border-red-400' : 'border-gray-300'}`}
            {...register(`choice${index}`, {
              required: {
                value: true,
                message: `Enter a value for choice-${index}`
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id='description-help'>{errors[`choice${index}`]?.message}</span>
        </>
      ))}
    </div>
  )
}
