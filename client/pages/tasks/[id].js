import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import TaskDetails from '../../components/tasks/TaskDetails'
import Loading from '../../components/Loading'
import Header from '../../components/Header'
import PrivateRoute from '../../components/PrivateRoute'

export default function Manager (props) {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()

  useEffect(() => {
    if (!router.isReady) return

    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/${id}/`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        router.push({
          pathname: '/login',
          query: { error: 'You must be logged in to access this page' }
        }, '/login')
        return
      })
  }, [id, router])

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={[1]}>
    <div className='space-y-4 mt-2'>
      <Header title='Task Details' />

      <h2 className='font-bold text-3xl'>Task Details</h2>

      <TaskDetails data={data} />

      <div className='space-x-4'>
        <Link href='/tasks'>
          <a className={styles.button} id='all-tasks'>All Tasks</a>
        </Link>

        <Link href={`/tasks/edit/${id}`}>
          <a className={styles.button} id='edit'>Edit</a>
        </Link>
      </div>
    </div>
    </PrivateRoute>
  )
}
