import React from 'react'

export default function ServiceNumeric ({ register, errors, task, index }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    helpText: 'text-sm text-red-700 mt-1',
  }

  return (
    <div className={styles.inputContainer}>
      <input type='number' min={task.rule.options.min} max={task.rule.options.max} id={`task-${index+1}`} 
        className={`${styles.input} border-gray-300`}
        {...register(`task-${task.id}`)}
      />
    </div>
  )
}
