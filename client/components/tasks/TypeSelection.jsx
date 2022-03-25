import React, { useState } from 'react'

export default function TypeSelection ({ number }) {
  var rows = []
  for(let i = 0; i < number; i++) rows.push(i)

  const styles = {
    inputContainer: 'flex flex-col space-y-2 mt-2',
    input: 'p-2 border rounded',
  }

  if (number == 0) {
    return (
      <></>
    )
  }

  return (
    <div className={styles.inputContainer}>
      <label htmlFor='choices'>Choices</label>
      {rows.map((items, index) => (
        <input type='text' key={index} name={`choice-${index}`} id={`choice-${index}`} className={styles.input} />
      ))}
    </div>
  )
}
