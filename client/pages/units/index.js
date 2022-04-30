import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitTable from '../../components/units/UnitTable'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'

export default function Index (props) {
  const router = useRouter()
  const [data, setData] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err.response?.data)
        const output = handleError(err)
        setError(output)
      })
  }, [router])

  const labels = {
    text: ['External ID', 'Model Number', 'Serial Number', 'Type', 'Manufacturer'],
    id: ['id', 'model', 'serial', 'category', 'manufacturer']
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
    <PrivateRoute isAllowed={[1,2]}>
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Units</title>
      </Head>

      <h2 className='font-bold text-3xl'>Units</h2>

      {data.length === 0 ? <p className={styles.desc} id='no-units'>No existing units</p> : <UnitTable data={data} labels={labels} />}

      <div className='mt-2'>
        <Link href='/units/create'>
          <a className={styles.button}>New Unit</a>
        </Link>
      </div>
    </div>
    </PrivateRoute>
  )
}
