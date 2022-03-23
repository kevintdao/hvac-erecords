import React, { useState } from 'react'
import Header from '../../components/Header'
import TaskForm from '../../components/tasks/TaskForm'
import Alert from '../../components/Alert'

export default function Create () {
  const [id, setId] = useState(null)
  const [error, setError] = useState()

  const styles = {
    
  }

  const onSubmit = async () => {

  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title="Create Task" />

      <h2 className='font-bold text-3xl'>Create Task</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <TaskForm type='Create' onSubmit={onSubmit} />
    </div>
  )
}
