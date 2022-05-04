import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import TaskTable from '../../components/tasks/TaskTable'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'

export default function Index () {
  const router = useRouter()
  const [data, setData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        const output = handleError(err)
        setError(output)
        return
      })
  }, [router])

  const labels = {
    text: ['Title', 'Type'],
    id: ['title', 'type']
  }

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    desc: 'font-medium font-gray-900'
  }

  if (error) {
    return <div className='mt-2 font-bold text-lg' id='message'>{error}</div>
  }
  
  if (!data) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={[1]}>
    <div className='space-y-4 mt-2'>
      <Header title='Tasks' />

      <h2 className='font-bold text-3xl'>Tasks</h2>

      {data.length === 0 ? <p className={styles.desc} id='no-tasks'>No existing tasks</p> : <TaskTable data={data} labels={labels} />}

      <div className='mt-2'>
        <Link href='/tasks/create'>
          <a className={styles.button}>New Task</a>
        </Link>
      </div>
    </div>
    </PrivateRoute>
  )
}
