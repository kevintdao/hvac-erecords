import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../../components/Header'

export default function Task () {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Task Details' />

      <h2 className='font-bold text-3xl'>Task Details</h2>

      <div className='space-x-4'>
        <Link href='/tasks'>
          <a className={styles.button} id='all-units'>All Units</a>
        </Link>
      </div>
    </div>
  )
}
