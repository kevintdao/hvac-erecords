import React from 'react'

export default function ServiceText ({ register, errors, task, index }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    helpText: 'text-sm text-red-700 mt-1',
  }

  return (
    <div className={styles.inputContainer}>
      <textarea className={`${styles.input} border-gray-300`}
        {...register(`task-${task.id}`)}
      >
      </textarea>
    </div>
  )
}
