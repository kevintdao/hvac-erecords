import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import ManagerForm from '../../../components/managers/ManagerForm'
import Alert from '../../../components/Alert'
import Loading from '../../../components/Loading'

export default function Edit (props) {
  const router = useRouter()
  const { id } = router.query
  const [managerId, setManagerId] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  useEffect(() => {
    if (!router.isReady) return

    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/managers/${id}/`)
      .then((res) => {
        setData(res.data)
      })
  }, [router.isReady])

  const onSubmit = async (data) => {
    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/managers/${id}/`, data)
      .then(res => {
        setManagerId(res.data.id)
      })
      .catch(() => {
        setError('Error with request')
      })
  }

  // successfully updated manager
  if (managerId) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully updated a manager. Click the link below to the updated manager or all the managers'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href='/managers'>
            <a className={styles.button}>All Managers</a>
          </Link>
          <Link href={`/managers/${id}`}>
            <a className={styles.button}>See Manager Info</a>
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
      <Head>
        <title>Update Manager</title>
      </Head>

      <h2 className='font-bold text-3xl'>Update Manager</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <ManagerForm type='Update' data={data} onSubmit={onSubmit} />
    </div>
  )
}
