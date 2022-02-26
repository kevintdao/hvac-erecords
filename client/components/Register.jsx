import React, { useRef, useState } from 'react'

export default function Register(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [passwordConfValidation, setPasswordConfValidation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // check for empty email and password

    // call server api to verify information
  }

  const handleEmailChange = (e) => {
    if(e.target.value.length > 0){
      setEmailValidation("");
    }
  }

  const handlePassChange = (e) => {
    if(e.target.value.length > 0){
      setPasswordValidation("");
    }
  }

  const handlePassConfChange = (e) => {
    if(e.target.value.length > 0){
      setPasswordConfValidation("");
    }
  }

  return (
    <div className='mt-2'>
      <form action="" method="post" onSubmit={handleSubmit} className='flex item-center justify-center py-2'>
        <div className='w-4/5 max-w-md space-y-4 p-4 rounded-md bg-white shadow-md border border-gray-200'>
          <h2 className='text-center font-bold text-3xl'>Register</h2>

          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              id="email" 
              ref={emailRef} 
              className={`p-2 border rounded ${emailValidation ? "border-red-400" : "border-gray-300"}`}
              onChange={handleEmailChange}
            />
            <span className='text-sm text-red-700 mt-1' id="email-help">{emailValidation}</span>
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              ref={passwordRef} 
              className={`p-2 border rounded ${passwordValidation ? "border-red-400" : "border-gray-300"}`} 
              onChange={handlePassChange}
            />
              <span className='text-sm text-red-700 mt-1' id="pass-help">{passwordValidation}</span>
          </div>

          {/* confirm password */}
          <div className="flex flex-col">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input 
              type="password" 
              name="password-confirm" 
              id="password-confirm" 
              ref={passwordConfRef} 
              className={`p-2 border rounded ${passwordConfValidation ? "border-red-400" : "border-gray-300"}`} 
              onChange={handlePassConfChange}
            />
              <span className='text-sm text-red-700 mt-1' id="pass-help">{passwordConfValidation}</span>
          </div>

          {/* signup button */}
          <div className="flex flex-col">
            <button className='p-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800'>Sign Up</button>
          </div>

          {/* login button */}
          <div className='flex justify-center'>
            <a href="/login" className='hover:text-blue-500'>Already have an account?</a>
          </div>
        </div>
      </form>
    </div>
  )
}
