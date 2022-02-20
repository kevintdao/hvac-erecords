import React from 'react'
import { Menu } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'

export default function NavBar(props) {
  const role = "Maintenance Company";
  const isLoggedIn = false;

  function MaintenanceCompanyLinks(){
    return (
      <div className='flex space-x-4 items-center'>
        <a href="manage" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Manage</a>
        <a href="units" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Units</a>
        <a href="users" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Users</a>
      </div>
    )
  }

  function BuildingOwnerLinks(){
    return (
      <div className='flex space-x-4 items-center'>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Data</a>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Units</a>
      </div>
    )
  }
  
  function InspectorLinks(){
    return (
      <div className='flex space-x-4 items-center'>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Data</a>
      </div>
    )
  }

  function TechnicianLinks(){
    return (
      <div className='flex space-x-4 items-center'>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Data</a>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Report</a>
      </div>
    )
  }

  function NotSignedInOptions(){
    return (
      <div className='space-x-4'>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Login</a>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Sign Up</a>
      </div>
    )
  }

  function MenuDropdown(){
    return (
      <Menu as="div" className="ml-3 relative pt-1">
        <Menu.Button className="">
          <MenuIcon className='block h-6 w-6 text-gray-300 hover:text-white'/>
        </Menu.Button>

        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white">
          <Menu.Item>
            {({ active }) => (
              <a 
                href="" 
                className={`${active && 'bg-gray-100'} block px-4 py-2 text-sm text-gray-700`}
              >
                Profile
              </a>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <a 
                href="" 
                className={`${active && 'bg-gray-100'} block px-4 py-2 text-sm text-gray-700`}
              >
                Sign Out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    )
  }

  return (
    <nav className='bg-gray-800 py-2'>
      <div className='max-w-6xl mx-auto px-2'>
        <div className='flex items-center justify-between'>
          {/* left */}
          <div className='flex space-x-4'>
            {/* logo */}
            <a href="/" className='text-gray-300 px-1 py-2 text-sm font-medium rounded'>Logo</a>

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

