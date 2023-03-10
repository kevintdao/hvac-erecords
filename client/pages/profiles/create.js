import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '../../components/Header'
import Alert from '../../components/Alert'
import ProfileForm from '../../components/profiles/ProfileForm'
import Loading from '../../components/Loading'
import { handleError } from '../../utils/errors'
import PrivateRoute from '../../components/PrivateRoute'

export default function Create () {
  const router = useRouter()
  const [id, setId] = useState(null)
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [backendError, setBackendError] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        const output = handleError(err)
        setBackendError(output)
        return
      })
  }, [router])

  const onSubmit = async (data) => {
    const tasks = formatTasks(data.tasks)
    data.tasks = tasks

    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/profiles`, data)
    .then(res => {
      setId(res.data.id)
    })
    .catch(error => {
      const output = handleError(error)
      setError(output)
    })
  }

  const formatTasks = (tasks) => {
    const numTasks = Object.keys(tasks).length
    const output = []
    for(let i = 0; i < numTasks; i++){
      output.push({
        task_id: tasks[`t${i}`],
        position: i + 1
      })
    }
    return output
  }

  if (backendError) {
    return <div className='mt-2 font-bold text-lg' id='message'>{backendError}</div>
  }

  if (!data) {
    return (<Loading />)
  }

  if (id) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully created a profile. Click the link below to the newly created profile or all the profiles'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href='/profiles'>
            <a className={styles.button}>All profiles</a>
          </Link>
          <Link href={`/profiles/${id}`}>
            <a className={styles.button}>See profile info</a>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PrivateRoute isAllowed={[1]}>
    <div className='space-y-4 mt-2'>
      <Header title='Create Maintenance Profile' />

      <h2 className='font-bold text-3xl'>Create Maintenance Profile</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <ProfileForm type='Create' tasks={data} onSubmit={onSubmit} />
    </div>
    </PrivateRoute>
  )
}
