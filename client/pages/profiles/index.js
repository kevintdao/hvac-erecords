import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import ProfileTable from '../../components/profiles/ProfileTable'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'

export default function Index () {
  const router = useRouter()
  const [data, setData] = useState()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/profiles`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        router.push({
          pathname: '/login',
          query: { error: 'You must be logged in to access this page' }
        }, '/login')
        return
      })
  }, [router])

  const labels = {
    text: ['Title', 'Number of tasks'],
    id: ['title', 'num-tasks']
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
      <Header title='Profiles' />

      <h2 className='font-bold text-3xl'>Profiles</h2>

      {data.length === 0 ? <p className={styles.desc} id='no-tasks'>No existing profiles</p> : <ProfileTable data={data} labels={labels} />}

      <div className='mt-2'>
        <Link href='/profiles/create'>
          <a className={styles.button}>New Profile</a>
        </Link>
      </div>
    </div>
    </PrivateRoute>
  )
}
