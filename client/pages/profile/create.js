import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import Alert from '../../components/Alert'
import ProfileForm from '../../components/profile/ProfileForm'
import Loading from '../../components/Loading'

export default function Create () {
  const [data, setData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks`)
      .then((res) => {
        setData(res.data)
      })
  }, [])

  const onSubmit = async () => {

  }

  if (!data) {
    return (<Loading />)
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Create Maintenance Profile' />

      <h2 className='font-bold text-3xl'>Create Maintenance Profile</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <ProfileForm tasks={data} onSubmit={onSubmit} />
    </div>
  )
}
