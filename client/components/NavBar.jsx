import React from 'react'
import { Menu } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'

export default function NavBar(props) {
  const role = props.role;

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
      <div>

      </div>
    )
  }

  function InspectorLinks(){
    return (
      <div>

      </div>
    )
  }

  function TechnicianLinks(){
    return (
      <div>

      </div>
    )
  }

  function SignedInButtons(){
    return (
      <div>

      </div>
    )
  }

  function NotSignedInButtons(){
    return (
      <div>

      </div>
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
            {/* profile settings */}
            <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Sign Out</a>
          
            {/* display buttons based on log in status */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="">
                  <span className='sr-only'>Open User Menu</span>
                  <MenuIcon className='block h-6 w-6 text-gray-300 hover:text-white'/>
                </Menu.Button>
              </div>

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
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  )
}

