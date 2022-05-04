import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import { useAppContext } from '../context/state'

export default function Home () {
  const { user } = useAppContext()
  const role = user.user?.role
  const isCompany = role == 1
  const isManager = role == 2
  const isTechnician = role == 3
  const isInspector = role == 4

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='HVAC E-Records' />

      <h2 className='font-bold text-3xl'>Welcome to HVAC E-Records</h2>
      {!role && <p>Click the login button to login to an existing account or sign up for an account</p>}
      
      {!role && <div className='space-x-4'>
        <Link href='/login'><a className={styles.button}>Login</a></Link>
        <Link href='/register'><a className={styles.button}>Sign Up</a></Link>
      </div>}
    </div>
  )
}
