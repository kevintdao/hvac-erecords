import React from 'react'

export default function TaskSelection ({ register, errors, number }) {
  var rows = []
  for(let i = 1; i <= number; i++) rows.push(i)

  const styles = {
    inputContainer: 'flex flex-col space-y-2 mt-2',
    input: 'p-2 border rounded',
    inputs2Cols: 'grid md:grid-cols-2 gap-x-4 gap-y-1 grid-cols-1',
  }

  if (number == 0 || number == null) {
    return (
      <></>
    )
  }

  return (
    <div className={styles.inputs2Cols}>
      {rows.map((item, index) => (
        <div key={index} className={styles.inputContainer}>
          <label htmlFor={`selection.c${item}`}>{`Choice ${item}`}</label>
          <input type='text' id={`${item}`} 
            className={`${styles.input} ${errors.selection?.[`c${item}`] ? 'border-red-400' : 'border-gray-300'}`}
            {...register(`selection.c${item}`, {
              required: {
                value: true,
                message: `Enter a value for choice-${item}`
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id={`${item}-help`}>{errors.selection?.[`c${item}`]?.message}</span>
        </div>
      ))}
    </div>
  )
}
