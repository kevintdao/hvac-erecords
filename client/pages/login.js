import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/state'
import Login from '../components/Login'
import Header from '../components/Header'
import Alert from '../components/Alert'

export default function LoginPage () {
  const { login, data, setData } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState()

  const onSubmit = async (inputData) => {
    login(inputData.email, inputData.password)
      .then(res => {
        setData(data => ({
          ...data,
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
          isLoggedIn: true
        }))

        // save tokens to localStorage
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)

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
