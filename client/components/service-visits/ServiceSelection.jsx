import React from 'react'

export default function ServiceSelection ({ register, errors, task, index }) {
  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
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
          <input type='radio' name={index+1} id={`task-${index+1}-${i+1}`} value={item} {...register(`task-${task.id}`)}/>
          {item}
        </label>
      ))}
    </div>
  )
}
