import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context/state'
import Loading from '../../components/Loading'

export default function QRCodeRedirect() {
  const router = useRouter()
  const { id } = router.query
  const { data } = useAppContext()
  const role = data.user?.role.toLowerCase()

  // check user role and direct to the correct page based on user type
  useEffect(() => {
    if (!router.isReady) return

    if (!role) {
      router.push('/login')
      return
    }
    
    if (role == 'technician') {
      router.push(`${process.env.NEXT_PUBLIC_URL}/service-plans/${id}`)
    }
    else if (role == 'manager') {
      router.push(`${process.env.NEXT_PUBLIC_URL}/units/${id}`)
    }
    else{
      router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard`)
    }
  }, [id, router.isReady, role])
  
  
  return (
    <div><Loading /></div>
  )
}
