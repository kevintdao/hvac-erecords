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
    <div className='space-y-4 mt-2'>
      <Header title='Create Task' />

      <h2 className='font-bold text-3xl'>Create Task</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <TaskForm type='Create' onSubmit={onSubmit} />
    </div>
  )
}
