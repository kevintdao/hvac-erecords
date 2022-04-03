import React from 'react'
import Header from '../components/Header'

export default function Home () {
  return (
    <div className='space-y-4 mt-2'>
      <Header title='HVAC E-Records' />

      <h2 className='font-bold text-3xl'>Welcome to HVAC E-Records</h2>
      <p>Click the login button to login to an existing account or sign up for an account</p>
    </div>
  )
}
