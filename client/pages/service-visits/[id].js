import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '../../components/Header'
import ServiceForm from '../../components/service-visits/ServiceForm'
import Loading from '../../components/Loading'

export default function ServiceProfile () {
  const router = useRouter()
  const { id } = router.query    // profile id
  const [data, setData] = useState()

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const plan = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/plans/${id}`)
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
    fetchData()
  }, [id, router.isReady])

  if (!data) {
    return (<Loading />)
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Service Visit' />  

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>{data.profile.title}</h2>
        <p>{data.profile.description}</p>

        <hr />
      
        <ServiceForm data={data.tasks} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
