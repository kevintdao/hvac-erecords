import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PrivateRoute from '../../../components/PrivateRoute'
import Header from '../../../components/Header'
import Loading from '../../../components/Loading'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitDetails from '../../../components/units/UnitDetails'
import UnitRecords from '../../../components/records/UnitRecords'
import { useAppContext } from '../../../context/state'
import { handleError } from '../../../utils/errors'

export default function Record() {
  const router = useRouter()
  const { id } = router.query
  const [records, setRecords] = useState()
  const { data } = useAppContext()
  const [error, setError] = useState()

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const details = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/records/`)
      .catch(err => {
        const output = handleError(err)
        setError(output)
        return
      })

      if (!details) {
        return
      }
      setRecords(details.data)
    }

    fetchData()
  }, [router, id])

  if (error) {
    return <div className='mt-2 font-bold text-lg' id='message'>{error}</div>
  }

  if (!records) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={[1,2,3]}>
    <div className='space-y-4 mt-2'>
      <Header title='Unit Records' />  

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>Unit Records</h2>
      
        <div>
          <h4 className='font-bold text-xl'>Details</h4>
          <UnitDetails data={records} />
        </div>

        {data.user?.role == 3 && <div>
          <div className='py-2'>
            <Link href={`/service-plans/${id}`}>
              <a className={styles.button} id='data'>Back to Service Plans</a>
            </Link>
          </div>

          <div className='mt-2'>
            <hr />
          </div>
        </div>}

        
        <h4 className='font-bold text-xl'>Records</h4>
        <UnitRecords data={records} unitId={id} />
      </div>

    </div>
    </PrivateRoute>
  )
}
