import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Link from 'next/link'
import axios from 'axios'
import TaskTable from '../../components/tasks/TaskTable'
import Loading from '../../components/Loading'

export default function Index () {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks`)
      .then((res) => {
        setData(res.data)
      })
  }, [])

  const labels = {
    text: ['Title', 'Type'],
    id: ['title', 'type']
  }

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    desc: 'font-medium font-gray-900'
  }

  if (!data) {
    return (<Loading />)
  }

  return (
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
  )
}
