import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import ManagerTable from '../../components/managers/ManagerTable'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'

export default function Index () {
  const router = useRouter()
  const [data, setData] = useState()
  const [backendError, setBackendError] = useState()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/managers`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        const output = handleError(err)
        setBackendError(output)
        return
      })
  }, [router])

  const labels = {
    text: ['Name', 'Phone Number'],
    id: ['name', 'phone_number']
  }

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    desc: 'font-medium font-gray-900'
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
