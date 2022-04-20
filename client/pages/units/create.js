import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import UnitForm from '../../components/units/UnitForm'
import Alert from '../../components/Alert'
import { handleError } from '../../utils/errors'
import PrivateRoute from '../../components/PrivateRoute'
import Loading from '../../components/Loading'

export default function Create () {
  const router = useRouter()
  const [id, setId] = useState(null)
  const [error, setError] = useState()
  const [data, setData] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  useEffect(() => {
    const fetchData = async () => {
      const buildings = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/buildings`)
      .catch(err => {
        return
      })

      if (!buildings) {
        router.push({
          pathname: '/login',
          query: { error: 'You must be logged in to access this page' }
        }, '/login')
        return
      }

      setData(buildings.data)
    }

    fetchData()
  }, [router])
  

  const onSubmit = async (data) => {
    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/units`, data)
      .then(res => {
        setId(res.data.id)
      })
      .catch(() => {
        const output = handleError(error)
        setError(output)
      })
  }

  if (!data) {
    return (<Loading />)
  }

  // successfully created unit
  if (id) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully created a unit. Click the link below to the newly created unit or all the units'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href='/units'>
            <a className={styles.button}>All units</a>
          </Link>
          <Link href={`/units/${id}`}>
            <a className={styles.button}>See unit info</a>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PrivateRoute isAllowed={['company', 'manager']}>
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Create Unit</title>
      </Head>

      <h2 className='font-bold text-3xl'>Create Unit</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <UnitForm type='Create' buildings={data} onSubmit={onSubmit} />
    </div>
    </PrivateRoute>
  )
}
