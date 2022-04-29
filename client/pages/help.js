import React from 'react'
import { useAppContext } from '../context/state'
import NotLoggedIn from '../components/help/NotLoggedIn'
import CompanyHelp from '../components/help/CompanyHelp'
import ManagerHelp from '../components/help/ManagerHelp'
import TechnicianHelp from '../components/help/TechnicianHelp'

export default function Help() {
  const { data } = useAppContext()
  const role = data.user?.role
  const isCompany = role == 1
  const isManager = role == 2
  const isTechnician = role == 3
  const isInspector = role == 4

  return (
    <div>
      {!role && <NotLoggedIn />}
      {isCompany && <CompanyHelp />}
      {isManager && <ManagerHelp />}
      {isTechnician && <TechnicianHelp />}
    </div>
  )
}
