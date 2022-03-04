import React from 'react'

export default function BuildingOwnerRegister() {
  return (
    <div className='mt-2'>
      <form action="" method="post" className='space-y-4'>
        <h2 className='font-bold text-3xl'>Building Owner Account Creation</h2>

        {/* email */}
        <div className='flex flex-col'>
          <label htmlFor="email" className="mb-2">Email</label>
          <input type="text" name="email" id="email" className='p-2 border rounded border-gray-300' />
        </div>

        <div className='grid md:grid-cols-3 md:gap-4 grid-cols-1'>
          {/* first name */}
          <div className='flex flex-col'>
            <label htmlFor="first-name">First Name</label>
            <input type="text" name="first-name" id="first-name" className='p-2 border rounded border-gray-300'/>
          </div>

          {/* last name */}
          <div className='flex flex-col'>
            <label htmlFor="last-name">Last Name</label>
            <input type="text" name="last-name" id="last-name" className='p-2 border rounded border-gray-300'/>
          </div>

          {/* phone number */}
          <div className='flex flex-col'>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" name="phone" id="phone" className='p-2 border rounded border-gray-300'/>
          </div>
        </div>

        {/* submit button */}
        <button className='px-4 py-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800' id='create-button'>Create</button>
      </form>
    </div>
  )
}
