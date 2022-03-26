import React, { useState } from 'react'
import Header from '../../components/Header'
import Loading from '../../components/Loading'

export default function Index () {
  const [data, setData] = useState()

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Tasks' />

    <h2 className='font-bold text-3xl'>Tasks</h2>
      Tasks Index Page (View all tasks for that user)
    </div>
  )
}
