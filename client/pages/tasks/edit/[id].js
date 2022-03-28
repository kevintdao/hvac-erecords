import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '../../../components/Header'
import TaskForm from '../../../components/tasks/TaskForm'
import Alert from '../../../components/Alert'
import Loading from '../../../components/Loading'

export default function Edit (props) {
  const router = useRouter()
  const { id } = router.query
  const [taskId, setTaskId] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  useEffect(() => {
    if (!router.isReady) return

    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/${id}/`)
      .then((res) => {
        setData(res.data)
      })
  }, [id, router.isReady])

  const onSubmit = async (data) => {
    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/${id}/`, data)
      .then(res => {
        setTaskId(res.data.id)
      })
      .catch(() => {
        setError('Error with request')
      })
  }

  // successfully updated task
  if (taskId) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully updated a task. Click the link below to the updated task or all the tasks'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href='/tasks'>
            <a className={styles.button}>All Tasks</a>
          </Link>
          <Link href={`/tasks/${id}`}>
            <a className={styles.button}>See Task Info</a>
          </Link>
        </div>
      </div>
    )
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Update Task' />

      <h2 className='font-bold text-3xl'>Update Task</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <TaskForm type='Update' data={data} onSubmit={onSubmit} />
    </div>
  )
}
