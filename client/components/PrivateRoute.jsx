import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/state'

export default function PrivateRoute ({ isAllowed, children }) {
  const router = useRouter()
  const { data } = useAppContext()
  const role = data.user?.role

  if (!role) {
    return <div className='mt-2 font-bold text-lg' id='message'>You must be logged in to access this page</div>
  }

  if (isAllowed && !isAllowed.includes(role)) {
    return <div className='mt-2 font-bold text-lg' id='message'>You don&apos;t have access to this page</div>
  }

  return (
    {...children}
  )
}
