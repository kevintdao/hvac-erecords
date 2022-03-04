import React from 'react'
import { useForm } from 'react-hook-form'

export default function BuildingOwnerRegister() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // call server api to verify information
  }

  return (
    <div className='mt-2'>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <h2 className='font-bold text-3xl'>Building Owner Account Creation</h2>

        {/* email */}
        <div className='flex flex-col'>
          <label htmlFor="email" className="mb-2">Email</label>
          <input 
            type="text" 
            name="email" 
            id="email" 
            className={`p-2 border rounded ${errors.email ? "border-red-400" : "border-gray-300"}`} 
            {...register('email', {
              required: {
                value: true,
                message: "Enter an email"
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Enter a valid email"
              },
              maxLength: {
                value: 320,
                message: "Email address should not exceed 320 characters"
              }
            })}  
          />
          <span className='text-sm text-red-700 mt-1' id="email-help">{errors.email?.message}</span>
          <small className="text-gray-400 mt-1">Email should not exceed 320 characters.</small>
        </div>

        <div className='grid md:grid-cols-3 md:gap-4 grid-cols-1'>
          {/* first name */}
          <div className='flex flex-col'>
            <label htmlFor="first-name">First Name</label>
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              className={`p-2 border rounded ${errors.fname ? "border-red-400" : "border-gray-300"}`}
              {...register('fname', {
                required: {
                  value: true,
                  message: "Enter a first name"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="fname-help">{errors.fname?.message}</span>
          </div>

          {/* last name */}
          <div className='flex flex-col'>
            <label htmlFor="last-name">Last Name</label>
            <input 
              type="text" 
              name="last-name" 
              id="last-name" 
              className={`p-2 border rounded ${errors.lname ? "border-red-400" : "border-gray-300"}`}
              {...register('lname', {
                required: {
                  value: true,
                  message: "Enter a last name"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="lname-help">{errors.lname?.message}</span>
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
