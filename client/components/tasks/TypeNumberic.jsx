import React from 'react'

export default function TypeNumberic ({ register, errors }) {
  const styles = {
    inputContainer: 'flex flex-col space-y-2 mt-2',
    input: 'p-2 border rounded',
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor='min'>Minimum value</label>
        <input type='number' name='min' id='min' 
          className={`${styles.input} ${errors.numberic?.min ? 'border-red-400' : 'border-gray-300'}`}
          {...register(`numberic.min`, {
            required: {
              value: true,
              message: `Enter a minimum value`
            }
          })}
        />
        <span className='text-sm text-red-700 mt-1' id='min-help'>{errors.numberic?.min?.message}</span>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='max'>Maximum value</label>
        <input type='number' name='max' id='max' 
          className={`${styles.input} ${errors.numberic?.max ? 'border-red-400' : 'border-gray-300'}`}
          {...register(`numberic.max`, {
            required: {
              value: true,
              message: `Enter a maximum value`
            }
          })}
        />
        <span className='text-sm text-red-700 mt-1' id='max-help'>{errors.numberic?.max?.message}</span>
      </div>
    </>
  )
}
