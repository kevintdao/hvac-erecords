import React from 'react'
import PrivateRoute from '../../../components/PrivateRoute'
import Header from '../../../components/Header'

export default function Record() {
  return (
    <PrivateRoute isAllowed={['company', 'manager']}>
    <div className='space-y-4 mt-2'>
      <Header title='Unit Records' />  

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>Unit Records</h2>
      
      </div>
    </div>
    </PrivateRoute>
  )
}
