import React from 'react'

export default function TaskNumeric ({ register, errors, data }) {
  const styles = {
    inputContainer: 'flex flex-col space-y-2 mt-2',
    input: 'p-2 border rounded',
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor='min'>Minimum value</label>
        <input type='number' name='min' id='min' defaultValue={data?.rule.options.min}
          className={`${styles.input} ${errors.Numeric?.min ? 'border-red-400' : 'border-gray-300'}`}
          {...register(`Numeric.min`, {
            required: {
              value: true,
              message: `Enter a minimum value`
            }
          })}
        />
        <span className='text-sm text-red-700 mt-1' id='min-help'>{errors.Numeric?.min?.message}</span>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='max'>Maximum value</label>
        <input type='number' name='max' id='max' defaultValue={data?.rule.options.max}
          className={`${styles.input} ${errors.Numeric?.max ? 'border-red-400' : 'border-gray-300'}`}
          {...register(`Numeric.max`, {
            required: {
              value: true,
              message: `Enter a maximum value`
            }
          })}
        />
        <span className='text-sm text-red-700 mt-1' id='max-help'>{errors.Numeric?.max?.message}</span>
      </div>
    </>
  )
}
