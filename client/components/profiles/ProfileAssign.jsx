import React, { useState } from 'react'

export default function ProfileAssign ({ profiles }) {
  const [selected, setSelected] = useState()

  const labels = {
    text: ['Title', 'Description', 'Number of Tasks'],
    id: ['title', 'description', 'num-tasks']
  }

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    table: 'divide-y divide-gray-200 min-w-full table-fixed',
    header: 'px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    body: 'divide-y divide-gray-200 flex-1 sm:flex-none',
    cell: 'px-2 py-3 text-sm font-medium text-gray-900',
    link: 'font-medium text-blue-600 hover:text-blue-500',
    checkbox: 'form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
  }

  return (
    <div className='space-y-2'>
      <table className={styles.table}>
        <thead className='bg-gray-50'>
          <tr>
            <th></th>
            {labels.id.map((item, index) => (
              <th key={index} id={labels.id[index]} className={styles.header}>{labels.text[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {profiles.map((item, index) => (
            <tr key={index}>
              <td className={styles.cell}><input className={styles.checkbox} type='checkbox' name={item.id} id={item.id} /></td>
              <td className={`${styles.cell} w-1/4`} id={`title-${item.id}`}>{item.title}</td>
              <td className={`${styles.cell} w-1/2`} id={`description-${item.id}`}>{item.description}</td>
              <td className={`${styles.cell} w-1/10`} id={`num-tasks-${item.id}`}>{item.tasks.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
