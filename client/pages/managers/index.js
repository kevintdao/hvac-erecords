import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import ManagerTable from '../../components/managers/ManagerTable'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'

export default function Index (props) {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/managers`)
      .then((res) => {
        setData(res.data)
      })
  }, [])

  const labels = {
    text: ['Name', 'Phone Number'],
    id: ['name', 'phone_number']
  }

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    desc: 'font-medium font-gray-900'
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={['company']}>
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Building Managers</title>
      </Head>

      <h2 className='font-bold text-3xl'>Building Managers</h2>

      {data.length === 0 ? <p className={styles.desc} id='no-managers'>No existing building managers</p> : <ManagerTable data={data} labels={labels} />}

      <div className='mt-2'>
        <Link href='/managers/create'>
          <a className={styles.button}>New Manager</a>
        </Link>
      </div>
    </div>
    </PrivateRoute>
  )
}
