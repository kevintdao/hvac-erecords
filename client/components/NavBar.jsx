import React from 'react'
import Link from 'next/link'
import { useAppContext } from '../context/state'

export default function NavBar ({ role }) {
  const { data, setData, logout } = useAppContext()
  const isLoggedIn = data.isLoggedIn

  function createNavLinks(links){
    return (
      <div className='flex space-x-4 items-center'>
        {links.map((item) => (
          <Link key={item.name} href={item.href}>
            <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded cursor-pointer'>{item.name}</a>
          </Link>
        ))}
      </div>
    )
  }

  function MaintenanceCompanyLinks(){
    const mcLinks = [
      { name: 'Manage', href: '/managers' },
      { name: 'Units', href: '/units' },
      { name: 'Users', href: '/users'}
    ];

    return createNavLinks(mcLinks);
  }

  function BuildingOwnerLinks(){
    const boLinks = [
      { name: 'Data', href: '/' }
    ];

    return createNavLinks(boLinks);
  }
  
  function InspectorLinks(){
    const iLinks = [
      { name: 'Data', href: '/' }
    ];

    return createNavLinks(iLinks);
  }

  function TechnicianLinks(){
    const tLinks = [
      { name: 'Data', href: '/' },
      { name: 'Report', href: '/' }
    ];

    return createNavLinks(tLinks);
  }

  function NotSignedInOptions(){
    const notSignedInLinks = [
      { name: 'Login', href: '/login' },
      { name: 'Sign Up', href: '/register' }
    ];

    return createNavLinks(notSignedInLinks);
  }

  const signout = async () => {
    logout()

    // remove tokens from localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    window.location = '/'
  }

  function MenuDropdown(){
    return (
      <div className='flex space-x-4 items-center'>
        <div>
          <Link href='/'>
            <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded cursor-pointer' id='profile'>Profile</a>
          </Link>
        </div>
        <div>
          <a onClick={signout} className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded cursor-pointer' id='sign-out'>Sign Out</a>
        </div>
      </div>
    )
  }

  return (
    <nav className='bg-gray-800 py-2 z-50 sticky top-0'>
      <div className='max-w-5xl mx-auto px-2'>
        <div className='flex items-center justify-between'>
          {/* left */}
          <div className='flex space-x-4 items-center'>
            {/* logo */}
            <Link href='/'>
              <a className='text-gray-300 px-1 py-2 text-sm font-medium rounded'>HVAC E-Records</a>
            </Link>

            {/* nav links */}
            { role == 'Maintenance Company' && <MaintenanceCompanyLinks /> }
            { role == 'Building Owner' && <BuildingOwnerLinks /> }
            { role == 'Inspector' && <InspectorLinks /> }
            { role == 'Technician' && <TechnicianLinks /> }
          </div>

          {/* right */}
          <div className='flex space-x-4 items-center'>

            {/* display buttons based on log in status */}
            { isLoggedIn ? <MenuDropdown /> : <NotSignedInOptions />}
          </div>
        </div>
      </div>
    </nav>
  )
}