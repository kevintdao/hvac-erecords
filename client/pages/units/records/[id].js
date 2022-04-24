import React, { useState, useEffect } from 'react'
import PrivateRoute from '../../../components/PrivateRoute'
import Header from '../../../components/Header'
import Loading from '../../../components/Loading'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitDetails from '../../../components/units/UnitDetails'
import UnitRecords from '../../../components/records/UnitRecords'

export default function Record() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const details = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/records/`)
      .catch(err => {
        return
      })

      if (!details) {
        router.push({
          pathname: '/login',
          query: { error: 'You must be logged in to access this page' }
        }, '/login')
        return
      }
      setData(details.data)
    }

    fetchData()
  }, [router, id])

  if (!data) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={['company', 'manager']}>
    <div className='space-y-4 mt-2'>
      <Header title='Unit Records' />  

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>Unit Records</h2>
      
        <h4 className='font-bold text-xl'>Details</h4>
        <UnitDetails data={data} />

        <h4 className='font-bold text-xl'>Records</h4>
        <UnitRecords data={data} unitId={id} />
      </div>

    </div>
    </PrivateRoute>
  )
}
