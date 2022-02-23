import React, { useRef } from 'react'


export default function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      <form action="POST" className='flex item-center justify-center py-2'>
        <div className='w-1/2 max-w-md space-y-4'>
          <h2>Login</h2>

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
            <input type="button" value="Login" className='p-2 bg-blue-700 rounded text-white'/>
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
