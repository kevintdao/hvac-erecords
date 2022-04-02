import React, { useState } from 'react'
import Link from 'next/link'
import { useAppContext } from '../context/state'
import Register from '../components/Register'
import Header from '../components/Header'
import Alert from '../components/Alert'
import { handleError } from '../utils/errors'

export default function Signup () {
  const { signup } = useAppContext()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  const onSubmit = async (data) => {
    signup(data.email, data.password)
      .then(res => {
        setSuccess(true)
      })
      .catch(error => {
        const output = handleError(error)
        setError(output)
      })
  }

  // successfully sign up
  if (success) {
    return (
      <div className='mt-2'>
        <Header title='Successfully Register' />
        <Alert
          title='Successful'
          text='Successfully register. Click the link below to login.'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href='/login'>
            <a className={styles.button}>Login</a>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header title='Register' />
      
      <div className='mt-2'>
        {error && <Alert title='Error' text={error} type='error' />}
      </div>

      <Register onSubmit={onSubmit} />
    </div>
  )
}
