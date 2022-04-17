import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/state'

export default function PrivateRoute ({ isAllowed, children }) {
  const router = useRouter()
  const { data } = useAppContext()
  const role = data.user?.role.toLowerCase()

  if (!role) {
    router.push({
      pathname: '/login',
      query: { error: 'You must be logged in to access this page' }
    }, '/login')
    return <div></div>
  }

  if (!isAllowed.includes(role)) {
    return <div className='mt-2 font-bold text-lg'>You don't have access to this page</div>
  }


  return (
    {...children}
  )
}
