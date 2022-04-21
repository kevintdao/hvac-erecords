import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '../../components/Header'
import ServiceForm from '../../components/service-visits/ServiceForm'
import Loading from '../../components/Loading'
import { Temporal } from '@js-temporal/polyfill'
import Alert from '../../components/Alert'
import { handleError } from '../../utils/errors'
import PrivateRoute from '../../components/PrivateRoute'

export default function ServiceProfile () {
  const router = useRouter()
  const { id, unit } = router.query    // profile id, unit id
  const [data, setData] = useState()
  const [savedData, setSavedData] = useState(null)
  const [serviceId, setServiceId] = useState(null)
  const [error, setError] = useState()

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const plan = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/plans/${id}`)
      .catch(err => {
        return
      })

      if (!plan) {
        router.push({
          pathname: '/login',
          query: { error: 'You must be logged in to access this page' }
        }, '/login')
        return
      }

      const profileId = plan.data.profile
      const profile = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/profiles/${profileId}`)
      
      let endpoints = []
      let profileRes = profile.data.tasks
      for (let i = 0; i < profileRes.length; i++) {
        endpoints.push(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/${profileRes[i].task_id}/`)
      }

      let tList = []
      const res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      for (let i = 0; i < res.length; i++) {
        tList.push(res[i].data)
      }
      
      setData({
        profile: profile.data,
        tasks: tList 
      })
    }

    function loadStorage () {
      const storage = localStorage.getItem(router.asPath)
      if(storage) setSavedData(storage)
    }

    fetchData()
    loadStorage()
  }, [id, router])

  if (!data) {
    return (<Loading />)
  }

  const onSubmit = (data) => {
    const localStorageData = JSON.parse(localStorage.getItem(router.asPath))
    const endTime = Temporal.Now.instant().round('second').toString()
    const startTime = localStorageData.start_time

    delete data.start_time

    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/visits`, {
      technician: 1,    // hardcoded technician for now
      plan: id,
      start_time: startTime,
      end_time: endTime
    })
    .then(res => {
        const serviceId = res.data.id
        let taskData = formatData(serviceId, data, localStorageData)
        taskData.map(async (item, index) => {
          const completionRes = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/completions`, item)
        })
        localStorage.removeItem(router.asPath)
        setServiceId(serviceId)
    })
    .catch(error => {
      const output = handleError(error)
      setError(output)
    })
  }

  function formatData (serviceId, data, localStorageData) {
    let output = []
    
    for (const key in data) {
      const value = data[key]
      let taskData = {
        task: key,
        service_visit: serviceId,
        completed_at: localStorageData[key].completed_at,
        selection: null,
        response: '',
        value: null,
      }

      switch(value.type) {
        case 'Numeric':
          taskData.value = value.value
          break
        case 'Selection':
          taskData.selection = value.value
          break
        case 'Text':
          taskData.response = value.value
          break
        default:
          break
      }
      output.push(taskData)
    }
    return output
  }

  // successfully submitted
  if(serviceId){
    return (
    <div className='mt-2'>
      <Alert 
      title='Successful'
      text='Successfully submited!'
      type='success'
      />
    </div>
    )
  }

  return (
    <PrivateRoute isAllowed={['technician']}>
    <div className='space-y-4 mt-2'>
      <Header title='Service Visit' />  

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>{data.profile.title}</h2>
        <p>{data.profile.description}</p>

        {error && <Alert title="Error" text={error} type="error" />}

        <hr />
      
        <ServiceForm data={data.tasks} onSubmit={onSubmit} savedData={JSON.parse(savedData)} name={router.asPath} />
      </div>
    </div>
    </PrivateRoute>
  )
}
