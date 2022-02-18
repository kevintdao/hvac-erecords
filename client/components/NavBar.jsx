import React from 'react'

export default function NavBar(props) {
  const role = props.role;

  function MaintanenceCompanayLinks(){
    return (
      <div className='flex space-x-4 items-center'>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Manage</a>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Units</a>
        <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Users</a>
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

  return (
    <nav className='bg-gray-800 py-2'>
      <div className='max-w-6xl mx-auto px-2'>
        <div className='flex items-center justify-between'>
          {/* left */}
          <div className='flex space-x-4'>
            {/* logo */}
            <a href="" className='text-gray-300 px-3 py-2 text-sm font-medium rounded'>Logo</a>

            {/* nav links */}
            { role == 'Maintenance Company' && <MaintanenceCompanayLinks /> }
            { role == 'Building Owner' && <BuildingOwnerLinks /> }
            { role == 'Inspector' && <InspectorLinks /> }
            { role == 'Technician' && <TechnicianLinks /> }
          </div>

          {/* right */}
          <div className='flex space-x-4'>
            {/* profile settings */}
            <a href="" className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium rounded'>Sign Out</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
