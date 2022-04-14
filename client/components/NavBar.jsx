import React from 'react'
import Link from 'next/link'
import { useAppContext } from '../context/state'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

export default function NavBar () {
  const { data, setData, logout } = useAppContext()
  const isLoggedIn = data.isLoggedIn
  const role = data.user?.role?.toLowerCase()

  const mcLinks = [
    { name: 'Managers', href: '/managers' },
    { name: 'Buildings', href: '/buildings' },
    { name: 'Tasks', href: '/tasks'},
    { name: 'Profiles', href: '/profiles'},
  ]

  const boLinks = [
    { name: 'Buildings', href: '/buildings' },
    { name: 'Units', href: '/units' }
  ]

  const iLinks = [
    { name: 'Data', href: '/' }
  ]

  const tLinks = [
    { name: 'Data', href: '/' },
    { name: 'Report', href: '/' }
  ]

  function createNavLinks(links, mobile){
    if(mobile) {
      return (
        <div>
          {links.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      )
    }

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

  function MaintenanceCompanyLinks ({ mobile }){
    return createNavLinks(mcLinks, mobile);
  }

  function BuildingOwnerLinks ({ mobile }){
    return createNavLinks(boLinks, mobile);
  }
  
  function InspectorLinks ({ mobile }){
    return createNavLinks(iLinks, mobile);
  }

  function TechnicianLinks ({ mobile }){
    return createNavLinks(tLinks, mobile);
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
          <a onClick={signout} className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded cursor-pointer' id='sign-out'>Sign Out</a>
        </div>
      </div>
    )
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 z-50 sticky top-0">
      {({ open }) => (
        <>
          <div className="max-w-5xl mx-auto sm:px-6 lg:px-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* logo */}
                  <Link href='/dashboard'>
                    <a className='text-gray-300 px-1 py-2 text-sm font-medium rounded'>HVAC E-Records</a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {/* nav links */}
                    { role == 'company' && <MaintenanceCompanyLinks /> }
                    { role == 'manager' && <BuildingOwnerLinks /> }
                    { role == 'inspector' && <InspectorLinks /> }
                    { role == 'technician' && <TechnicianLinks /> }
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className='flex space-x-4 items-center'>
                  {/* display buttons based on log in status */}
                  { isLoggedIn ? <MenuDropdown /> : <NotSignedInOptions />}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* mobile nav links */}
              { role == 'company' && <MaintenanceCompanyLinks mobile /> }
              { role == 'manager' && <BuildingOwnerLinks mobile /> }
              { role == 'inspector' && <InspectorLinks mobile /> }
              { role == 'technician' && <TechnicianLinks mobile /> }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}