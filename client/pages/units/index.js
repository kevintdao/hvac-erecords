import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import UnitTable from '../../components/units/UnitTable'
import Loading from '../../components/Loading'

export default function Index (props) {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units`)
      .then((res) => {
        setData(res.data)
      })
  }, [])

  const labels = {
    text: ['External ID', 'Model Number', 'Serial Number', 'Type', 'Manufacturer'],
    id: ['id', 'model', 'serial', 'category', 'manufacturer']
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
      <Head>
        <title>Units</title>
      </Head>

      <h2 className='font-bold text-3xl'>Units</h2>

      {data.length === 0 ? <p className={styles.desc}>No existing units</p> : <UnitTable data={data} labels={labels} />}

      <div className='mt-2'>
        <Link href='/units/create'>
          <a className={styles.button}>New Unit</a>
        </Link>
      </div>
    </div>
  )
}
