import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import ProfileDetails from '../../components/profiles/ProfileDetails'
import Loading from '../../components/Loading'
import Header from '../../components/Header'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'

export default function Profile () {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()
  const [backendError, setBackendError] = useState()

  useEffect(() => {
    if (!router.isReady) return

    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/profiles/${id}/`)
      .then((res) => {
        let profile = res.data
        // get all the tasks for the profile
        let endpoints = []
        let tasks = res.data.tasks
        for (let i = 0; i < tasks.length; i++) {
          endpoints.push(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/${tasks[i].task_id}/`)
        }

        let tasksList = []
        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
          .then((res) => {
            for (let i = 0; i < res.length; i++) {
              tasksList.push(res[i].data)
            }

            setData({
              profile: profile,
              tasks: tasksList
            })
        })
      })
      .catch(err => {
        const output = handleError(err)
        setBackendError(output)
      })
  }, [id, router])

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  if (backendError) {
    return <div className='mt-2 font-bold text-lg' id='message'>{backendError}</div>
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={[1]}>
    <div className='space-y-4 mt-2'>
      <Header title='Profile Details' />

      <h2 className='font-bold text-3xl'>Profile Details</h2>

      <ProfileDetails data={data} />

      <div className='space-x-4'>
        <Link href='/profiles'>
          <a className={styles.button} id='all-profiles'>All Profiles</a>
        </Link>

        <Link href={`/profiles/edit/${id}`}>
          <a className={styles.button} id='edit'>Edit</a>
        </Link>
      </div>
    </div>
    </PrivateRoute>
  )
}
