import React from 'react'
import { useAppContext } from '../context/state'
import NotLoggedIn from '../components/help/NotLoggedIn'
import CompanyHelp from '../components/help/CompanyHelp'
import ManagerHelp from '../components/help/ManagerHelp'
import TechnicianHelp from '../components/help/TechnicianHelp'
import Header from '../components/Header'

export default function Help() {
  const { user } = useAppContext()
  const role = user.user?.role
  const isCompany = role == 1
  const isManager = role == 2
  const isTechnician = role == 3
  const isInspector = role == 4

  return (
    <div className='space-y-4 mt-2'>
      <Header title='Help' />
      <h2 className='font-bold text-3xl'>Help</h2>

      {!role && <NotLoggedIn />}
      {isCompany && <CompanyHelp />}
      {isManager && <ManagerHelp />}
      {isTechnician && <TechnicianHelp />}
    </div>
  )
}
