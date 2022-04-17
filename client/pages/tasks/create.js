import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Header from '../../components/Header'
import TaskForm from '../../components/tasks/TaskForm'
import Alert from '../../components/Alert'
import { handleError } from '../../utils/errors'
import PrivateRoute from '../../components/PrivateRoute'

export default function Create () {
  const [id, setId] = useState(null)
  const [error, setError] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  const onSubmit = async (data) => {
    const type = data.type

    var values = { title: data.title, description: data.description, rule: {type: data.type} }
    switch(type){
      case 'Numeric':
        values.rule.options = data.Numeric
        break
      case 'Selection':
        values.rule.options = getSelectionChoices(data.selection)
        break
    }
    
    values.company = 1

    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/tasks`, values)
      .then(res => {
        setId(res.data.id)
      })
      .catch(() => {
        const output = handleError(error)
        setError(output)
    })
  }

  const getSelectionChoices = (selection) => {
    const numChoices = selection.choices
    const output = {}
    for(let i = 1; i <= numChoices; i++){
      output[i] = selection[`c${i}`]
    }
    output.choices = numChoices
    return output
  }

  if (id) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully created a task. Click the link below to the newly created task or all the task'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href='/tasks'>
            <a className={styles.button}>All tasks</a>
          </Link>
          <Link href={`/tasks/${id}`}>
            <a className={styles.button}>See task info</a>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PrivateRoute isAllowed={['company']}>
    <div className='space-y-4 mt-2'>
      <Header title='Create Task' />

      <h2 className='font-bold text-3xl'>Create Task</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <TaskForm type='Create' onSubmit={onSubmit} />
    </div>
    </PrivateRoute>
  )
}
