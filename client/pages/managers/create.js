import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import ManagerForm from '../../components/managers/ManagerForm'
import Alert from '../../components/Alert'
import { handleError } from '../../utils/errors'
import PrivateRoute from '../../components/PrivateRoute'

export default function Create () {
  const [id, setId] = useState(null)
  const [error, setError] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  const onSubmit = async (data) => {
    data.company = 1
    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/managers`, data)
      .then(res => {
        setId(res.data.id)
      })
      .catch(() => {
        const output = handleError(error)
        setError(output)
      })
  }

  // successfully created manager
  if (id) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully created a manager. Click the link below to the newly created manager or all the managers'
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

  return (
    <PrivateRoute isAllowed={['company']}>
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Create Manager</title>
      </Head>

      <h2 className='font-bold text-3xl'>Create Manager</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <ManagerForm type='Create' onSubmit={onSubmit} />
    </div>
    </PrivateRoute>
  )
}
