import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import ManagerDetails from '../../components/managers/ManagerDetails'
import Loading from '../../components/Loading'

export default function Manager (props) {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()

  useEffect(() => {
    if (!router.isReady) return

    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/managers/${id}/`)
      .then((res) => {
        setData(res.data)
      })
  }, [router.isReady])

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Manager Details</title>
      </Head>

      <h2 className='font-bold text-3xl'>Manager Details</h2>

      <ManagerDetails data={data} />

      <div className='space-x-4'>
        <Link href='/managers'>
          <a className={styles.button} id='all-managers'>All Managers</a>
        </Link>

        <Link href={`/managers/edit/${id}`}>
          <a className={styles.button} id='edit'>Edit</a>
        </Link>
      </div>
    </div>
  )
}
