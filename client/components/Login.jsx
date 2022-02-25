import React from 'react'
import { useForm } from 'react-hook-form'

export default function Login(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // call server api to verify information
  }

  return (
    <div className='mt-2'>
      <form action="POST" onSubmit={handleSubmit(onSubmit)} className='flex item-center justify-center py-2'>
        <div className='w-4/5 max-w-md space-y-4 p-4 rounded-md bg-white shadow-md border border-gray-200'>
          <h2 data-testid="login-header" className='text-center font-bold text-3xl'>Login</h2>

          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              id="email" 
              className={`p-2 border rounded ${errors.email ? "border-red-400" : "border-gray-300"}`}
              {...register("email", { 
                required: {
                  value: true,
                  message: "Enter an email"
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Enter a valid email"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="email-help">{errors.email?.message}</span>
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className={`p-2 border rounded ${errors.password ? "border-red-400" : "border-gray-300"}`} 
              {...register("password", { 
                required: {
                  value: true,
                  message: "Enter a password"
                } 
              })}
            />
              <span className='text-sm text-red-700 mt-1' id="pass-help">{errors.password?.message}</span>
          </div>

          {/* login button */}
          <div className="flex flex-col">
            <button className='p-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800' id='login-button'>Login</button>
          </div>

          {/* signup button */}
          <div className='flex justify-center'>
            <a href="/register" className='hover:text-blue-500' id='register-button'>Don't have an account?</a>
          </div>
        </div>
      </form>
    </div>
  )
}
