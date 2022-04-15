import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context/state'
import Loading from '../../components/Loading'

export default function QRCodeRedirect() {
  const router = useRouter()
  const { id } = router.query
  const { data } = useAppContext()

  // check user role and direct to the correct page based on user type
  
  return (
    <div><Loading /></div>
  )
}
