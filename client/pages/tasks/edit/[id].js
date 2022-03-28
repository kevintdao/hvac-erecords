import React from 'react'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'

export default function Edit (props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Edit Task' />

    <h2 className='font-bold text-3xl'>Edit Task</h2>
  </div>
  )
}
