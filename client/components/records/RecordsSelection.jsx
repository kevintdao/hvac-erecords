import React, { useEffect, useState } from 'react'

export default function RecordsSelection ({ data }) {
  const [choices, setChoices] = useState()

  const styles = {
    checkbox: "disabled:opacity-50 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
  }

  useEffect(() => {
    let output = []
    for (const [key, value] of Object.entries(data.task_rule.options)){
      output.push({
        key: key,
        value: value
      })
    }
    setChoices(output)
  }, [])

  if(!choices) {
    return <div></div>
  }

  return (
    <div>
      {choices.map(item => (
        <div key={item.key} >
          <input type='checkbox' name={`${data.task_id}-${item.key}`} id={`${data.task_id}-${item.key}`} 
            disabled 
            checked={data.selection == item.key}
            className={styles.checkbox}
          />
          <label htmlFor={`${data.task_id}-${item.key}`}>{item.value}</label>
        </div>
      ))}
    </div>
  )
}
