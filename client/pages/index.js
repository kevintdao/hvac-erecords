import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function Home () {
  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='HVAC E-Records' />

      <h2 className='font-bold text-3xl'>Welcome to HVAC E-Records</h2>
      <p>Click the login button to login to an existing account or sign up for an account</p>
      
      <div className='space-x-4'>
        <Link href='/login'><a className={styles.button}>Login</a></Link>
        <Link href='/register'><a className={styles.button}>Sign Up</a></Link>
      </div>
    </div>
  )
}
