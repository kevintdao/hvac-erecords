import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitDetails from '../../components/units/UnitDetails'
import Loading from '../../components/Loading'
import ProfileAssign from '../../components/profiles/ProfileAssign'

export default function Unit (props) {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()
  const [profiles, setProfiles] = useState()

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const details = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/`)
      const profiles = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/profiles`)

      setProfiles(profiles.data)
      setData(details.data)
    }

    fetchData()
  }, [id, router.isReady])

  const onSubmit = (data) => {
    console.log(data)
  }

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Unit Details</title>
      </Head>

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>Unit Details</h2>
        <UnitDetails data={data} />

        <div className='space-x-4 mt-2'>
          <Link href='/units'>
            <a className={styles.button} id='all-units'>All Units</a>
          </Link>

          <Link href={`/units/edit/${id}`}>
            <a className={styles.button} id='edit'>Edit</a>
          </Link>
        </div>
      </div>

      <hr />

      <div className='space-y-2'>
        <div className='flex flex-row justify-between'>
          <h2 className='font-bold text-3xl'>Assign Profile</h2>
          <button className={styles.button} id='assign-button'>Assign</button>
        </div>

        <ProfileAssign profiles={profiles} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
