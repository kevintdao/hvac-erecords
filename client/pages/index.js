import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import { useAppContext } from '../context/state'
import Image from 'next/image'
import Home1 from '../public/screenshots/Home1.jpeg'
import Home2 from '../public/screenshots/Home2.jpeg'
import Home4 from '../public/screenshots/Home4.png'

export default function Home () {
  const { user } = useAppContext()
  const role = user.user?.role
  const isCompany = role == 1
  const isManager = role == 2
  const isTechnician = role == 3
  const isInspector = role == 4

  const styles = {
    button: 'px-8 py-3 bg-blue-700 rounded font-semibold text-white text-center hover:bg-blue-800',
    grid_3: 'grid md:grid-cols-3 sm:grid-cols-2 sm:gap-4 gap-2 grid-cols-1 justify-center',
    container: 'border-gray-200 border p-2 rounded flex flex-col justify-center text-center',
    image_container: 'flex flex-col justify-center',
    image: 'rounded'
  }

  return (
    <div className='space-y-4 mt-2'>
      <Header title='HVAC E-Records' />

      <h2 className='font-bold text-3xl text-center'>Welcome to HVAC E-Records</h2>

      <p className='text-xl text-blue-700 text-center px-10'>
        With HVAC E-Records, you have all the functionalities of managing your buildings, units, and maintenance records
        all in one application.
      </p>

      <div className={styles.grid_3}>
        <div className={styles.container}>
          <div className={styles.image_container}>
            <Image src={Home1} alt='Home1' height={300} width={500} className={styles.image} />
          </div>
          <span>
              Record your maintenance visit by scanning the QR on a unit.
          </span>
        </div>
        
        <div className={styles.container}>
          <div className={styles.image_container}>
            <Image src={Home2} alt='Home2' height={300} width={500} className={styles.image} />
            <span>
              Manage all your buildings, units, and maintenance records.
            </span>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.image_container}>
            <Image src={Home4} alt='Home4' height={300} width={500} className={styles.image} />
            <span>
              View and export detailed maintenance reports
            </span>
          </div>
        </div>
      </div>

      {!role && <hr />}

      {!role && <div className='flex flex-col justify-center mt-6'>
        <h3 className='font-bold text-2xl text-center mb-2'>
          To get started
        </h3>
        <p className='text-lg text-center px-10'>
          Sign up as a maintenance company or log in to an existing account.
        </p>
      </div>}
      
      {!role && <div className='space-x-4 flex justify-center'>
        <Link href='/login'><a className={styles.button}>Login</a></Link>
        <Link href='/register'><a className={styles.button}>Sign Up</a></Link>
      </div>}
    </div>
  )
}
