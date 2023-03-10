import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/state'
import Login from '../components/Login'
import Header from '../components/Header'
import Alert from '../components/Alert'
import axios from 'axios'
import { handleError } from '../utils/errors'

export default function LoginPage () {
  const { login, user, setUser } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState(router.query?.error)

  const onSubmit = async (inputData) => {
    login(inputData.email, inputData.password)
      .then(async (res) => {
        const user = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/`, {
          headers: {
            Authorization: `Bearer ${res.data.access}`
          }
        })

        setUser(data => ({
          ...data,
          accessToken: res.data.access,
          refreshToken: res.data.refresh,
          isLoggedIn: true,
          user: user.data
        }))

        // save tokens to localStorage
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;

        if (user.data.role == 1 || user.data.role == 2) router.push('/dashboard')
        else router.push('/')
      })
      .catch(error => {
        const output = handleError(error)
        setError(output)
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
