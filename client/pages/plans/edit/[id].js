import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import PlanForm from '../../../components/plans/PlanForm'
import Alert from '../../../components/Alert'
import Loading from '../../../components/Loading'
import Header from '../../../components/Header'
import { handleError } from '../../../utils/errors'
import PrivateRoute from '../../../components/PrivateRoute'

export default function Plan () {
  const router = useRouter()
  const { id } = router.query
  const [planId, setPlanId] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const plans = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/plans/${id}/`)
      .catch(err => {
        return
      })

      if (!plans) {
        router.push({
          pathname: '/login',
          query: { error: 'You must be logged in to access this page' }
        }, '/login')
        return
      }

      const profiles = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/profiles`)

      setData({
        plan: plans.data,
        profile: profiles.data
      })
    }

    fetchData()
  }, [id, router])

  const onSubmit = (data) => {
    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/plans/${id}/`, data)
    .then(res => {
      setPlanId(res.data.id)
    })
    .catch(() => {
      const output = handleError(error)
      setError(output)
    })
  }

  // successfully updated plan
  if (planId) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully updated a plan. Click the link below to go back to unit details page'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href={`/units/${data.plan.unit}`}>
            <a className={styles.button}>Unit Details</a>
          </Link>
        </div>
      </div>
    )
  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={['company']}>
    <div className='space-y-4 mt-2'>
      <Header title='Create Maintenance Profile' />

      <h2 className='font-bold text-3xl'>Update Plan</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <PlanForm profiles={data.profile} plan={data.plan} onSubmit={onSubmit} />
    </div>
    </PrivateRoute>
  )
}
