import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '../../components/Header'
import AvailablePlans from '../../components/service-plans/AvailablePlans'
import OtherPlans from '../../components/service-plans/OtherPlans'
import UnitDetails from '../../components/units/UnitDetails'
import Loading from '../../components/Loading'
import { Temporal } from '@js-temporal/polyfill'
import { handleError } from '../../utils/errors'
import PrivateRoute from '../../components/PrivateRoute'

export default function Service () {
  const router = useRouter()
  const { id } = router.query    // unit id
  const [data, setData] = useState()

  const styles = {
    desc: 'font-medium font-gray-900'
  }

  const labels = {
    text: ['Title', 'Repeat', 'Start Date', 'End Date'],
    id: ['title', 'is-repeat', 'start-date', 'end-date']
  }

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const currentDate = Temporal.Now.plainDateISO()
      const unit = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/`)
      .catch(err => {
        return
      })

      if (!unit) {
        router.push({
          pathname: '/login',
          query: { error: 'You must be logged in to access this page' }
        }, '/login')
        return
      }

      let plans = unit.data.plans

      let output = {
        available: [],
        other: []
      }
      for(let i = 0; i < plans.length; i++){
        if(!plans[i].is_required) {
          output.other.push(plans[i])
        }
        else{
          // check current date with plans date
          const [ sYear, sMonth, sDay ] = plans[i].start_date.split('-')
          const [ eYear, eMonth, eDay ] = plans[i].end_date.split('-')
          const startDate = Temporal.PlainDate.from({ year: sYear, month: sMonth, day: sDay })
          const endDate = Temporal.PlainDate.from({ year: eYear, month: eMonth, day: eDay })

          if(Temporal.PlainDate.compare(currentDate, startDate) == 1 && Temporal.PlainDate.compare(endDate, currentDate)) {
            output.available.push(plans[i])
          }
          else{
            output.other.push(plans[i])
          }
        }
      }

      setData({
        unit: unit.data,
        plans: output
      })
    }

    fetchData()
  }, [id, router])

  if (!data) {
    return (<Loading />)
  }

  return (
    <PrivateRoute isAllowed={['technician']}>
    <div className='space-y-4 mt-2'>
      <Header title='Service Visit' />

      <h2 className='font-bold text-3xl'>Service Plans</h2>

      <div>
        <h4 className='font-bold text-xl'>Unit Details</h4>
        <UnitDetails data={data.unit} />
      </div>

      <div>
        <h4 className='font-bold text-xl'>Available Plans</h4>
        {data.plans.available.length === 0 ? <p className={styles.desc} id='no-available'>None</p> : <AvailablePlans data={data.plans.available} labels={labels} />}
      </div>

      <div>
        <h4 className='font-bold text-xl'>Other Plans</h4>
        {data.plans.other.length === 0 ? <p className={styles.desc} id='no-other'>None</p> : <OtherPlans data={data.plans.other} labels={labels} />}
      </div>
    </div>
    </PrivateRoute>
  )
}
