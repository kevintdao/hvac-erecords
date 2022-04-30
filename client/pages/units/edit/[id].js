import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitForm from '../../../components/units/UnitForm'
import Alert from '../../../components/Alert'
import Loading from '../../../components/Loading'
import { handleError } from '../../../utils/errors'
import PrivateRoute from '../../../components/PrivateRoute'

export default function Edit (props) {
  const router = useRouter()
  const { id } = router.query
  const [unitId, setUnitId] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()
  const [buildings, setBuildings] = useState()
  const [backendError, setBackendError] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const detail = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/`)
      .catch(err => {
        const output = handleError(err)
        setBackendError(output)
        return
      })

      if (!detail) {
        return
      }

      const buildingsDetail = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/buildings`)

      setBuildings(buildingsDetail.data)
      setData(detail.data)
    }

    fetchData()
  }, [id, router])

  const onSubmit = async (data) => {
    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/`, data)
      .then(res => {
        setUnitId(res.data.id)
      })
      .catch(() => {
        const output = handleError(error)
        setError(output)
      })
  }

  // successfully updated unit
  if (unitId) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully updated a unit. Click the link below to the updated unit or all the units'
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

  if(backendError) {
    return <div className='mt-2 font-bold text-lg' id='message'>{backendError}</div>
  }

  if (!data) {
    return (<Loading />)
  }

  console.log(buildings)

  return (
    <PrivateRoute isAllowed={[1,2]}>
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Update Unit</title>
      </Head>

      <h2 className='font-bold text-3xl'>Update Unit</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <UnitForm type='Update' buildings={buildings} data={data} onSubmit={onSubmit} />
    </div>
    </PrivateRoute>
  )
}
