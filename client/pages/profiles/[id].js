import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import ProfileDetails from '../../components/profiles/ProfileDetails'
import Loading from '../../components/Loading'
import Header from '../../components/Header'

export default function Profile (props) {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()

  useEffect(() => {
    if (!router.isReady) return

    // axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/profiles/${id}/`)
    //   .then((res) => {
    //     setData(res.data)
    //   })
  }, [id, router.isReady])

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Profile Details' />

      <h2 className='font-bold text-3xl'>Profile Details</h2>

      <ProfileDetails data={data} />

      <div className='space-x-4'>
        <Link href='/profiles'>
          <a className={styles.button} id='all-profiles'>All Profiles</a>
        </Link>

        <Link href={`/profiles/edit/${id}`}>
          <a className={styles.button} id='edit'>Edit</a>
        </Link>
      </div>
    </div>
  )
}
