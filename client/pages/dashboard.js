import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import { useAppContext } from '../context/state'
import PrivateRoute from '../components/PrivateRoute'

export default function Dashboard () {
  const { user } = useAppContext()
  const role = user.user?.role
  const isCompany = role == 1
  const isTechnician = role == 3
  const isManager = role == 2
  const isInspector = role == 4

  const styles = {
    cols3: 'grid md:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-4 grid-cols-1',
    colContainer: 'bg-white border border-gray-300 rounded p-2',
    colHeader: 'mb-3 font-bold text-xl',
    buttonDiv: 'space-y-3 flex flex-col',
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  return (
    <PrivateRoute>
      <div className='space-y-4 mt-2'>
        <Header title='Dashboard' />

        <h2 className='font-bold text-3xl'>Dashboard</h2>

        <div className={styles.cols3}>
          {isCompany && <div className={styles.colContainer}>
            <h3 className={styles.colHeader}>Building Managers</h3>
            <div className={styles.buttonDiv}>
              <Link href='/managers'><a className={styles.button}>View all</a></Link>
              <Link href='/managers/create'><a className={styles.button}>Create</a></Link>
            </div>
          </div>}

          {(isCompany || isManager) && <div className={styles.colContainer}>
            <h3 className={styles.colHeader}>Buildings</h3>
            <div className={styles.buttonDiv}>
              <Link href='/buildings'><a className={styles.button}>View all</a></Link>
              {isCompany && <Link href='/buildings/create'><a className={styles.button}>Create</a></Link>}
            </div>
          </div>}

          {(isCompany || isManager) && <div className={styles.colContainer}>
            <h3 className={styles.colHeader}>Units</h3>
            <div className={styles.buttonDiv}>
              <Link href='/units'><a className={styles.button}>View all</a></Link>
              {isCompany && <Link href='/units/create'><a className={styles.button}>Create</a></Link>}
            </div>
          </div>}

          {isCompany && <div className={styles.colContainer}>
            <h3 className={styles.colHeader}>Technicians</h3>
            <div className={styles.buttonDiv}>
              <Link href='/technicians'><a className={styles.button}>View all</a></Link>
              <Link href='/technicians/create'><a className={styles.button}>Create</a></Link>
            </div>
          </div>}

          {isCompany && <div className={styles.colContainer}>
            <h3 className={styles.colHeader}>Maintenance Tasks</h3>
            <div className={styles.buttonDiv}>
              <Link href='/tasks'><a className={styles.button}>View all</a></Link>
              <Link href='/tasks/create'><a className={styles.button}>Create</a></Link>
            </div>
          </div>}

          {isCompany && <div className={styles.colContainer}>
            <h3 className={styles.colHeader}>Maintenance Profiles</h3>
            <div className={styles.buttonDiv}>
              <Link href='/profiles'><a className={styles.button}>View all</a></Link>
              <Link href='/profiles/create'><a className={styles.button}>Create</a></Link>
            </div>
          </div>}
        </div>
      </div>
    </PrivateRoute>
  )
}
