import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/state'
import Login from '../components/Login'
import Header from '../components/Header'
import Alert from '../components/Alert'

export default function login () {
  const { login } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState()

  const onSubmit = async (data) => {
    login(data.email, data.password)
      .then(res => {
        router.push('/')
      })
      .catch(error => {
        setError(error.message)
      })
  }

  return (
    <div>
      <Header title='Login' />
      
      <div className='mt-2'>
        {error && <Alert title='Error' text={error} type='error' />}
      </div>

      <Login onSubmit={onSubmit} />
    </div>
  )
}
