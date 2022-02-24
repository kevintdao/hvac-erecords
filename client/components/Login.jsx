import React, { useRef } from 'react'
import { useState } from 'react';
import Alert from './Alert';

export default function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // call server api to verify infomation
  }

  return (
    <div className='mt-2'>
      <form action="POST" onSubmit={handleSubmit} className='flex item-center justify-center py-2'>
        <div className='w-4/5 max-w-md space-y-4 p-4 rounded-md bg-white shadow-md border border-gray-200'>
          <h2 className='text-center font-bold text-3xl'>Login</h2>

          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" ref={emailRef} className="p-2 border border-gray-300 rounded"/>
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" ref={passwordRef} className="p-2 border border-gray-300 rounded" />
          </div>

          {/* login button */}
          <div className="flex flex-col">
            <button className='p-2 bg-blue-700 rounded text-white text-center'>Login</button>
          </div>

          {/* signup button */}
          <div className='flex flex-col'>
            <a href="/register" className='p-2 bg-blue-700 rounded text-white text-center'>Register</a>
          </div>
        </div>
      </form>
    </div>
  )
}
