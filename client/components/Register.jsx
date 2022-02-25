import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

export default function Register(props) {
  const passRef = useRef(null);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { ref, ...rest } = register('password', {
    required: {
      value: true,
      message: "Enter a password"
    },
    minLength: {
      value: 8,
      message: "Must contains at least 8 characters"
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message: "Must contains at least 1 special character and 1 number"
    }
  });

  const onSubmit = (data) => {
    // call server api to verify information
  }

  const isSamePass = (passConf) => {
    if(passRef.current.value != passConf){
      return false;
    }
    return true;
  }

  return (
    <div className='mt-2'>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className='flex item-center justify-center py-2'>
        <div className='w-4/5 max-w-md space-y-4 p-4 rounded-md bg-white shadow-md border border-gray-200'>
          <h2 className='text-center font-bold text-3xl'>Register</h2>

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
              ref={(e) => {
                ref(e)
                passRef.current = e
              }}
              className={`p-2 border rounded ${errors.password ? "border-red-400" : "border-gray-300"}`} 
              {...rest}
            />
            <span className='text-sm text-red-700 mt-1' id="pass-help">{errors.password?.message}</span>
            <small className='text-gray-400 mt-1'>Password must contains at least 8 characters, 1 special character, and 1 number.</small>
          </div>

          {/* confirm password */}
          <div className="flex flex-col">
            <label htmlFor="password-confirm">Confirm Password</label>
            <input 
              type="password" 
              name="password-confirm" 
              id="password-confirm" 
              className={`p-2 border rounded ${errors.passwordConfirm ? "border-red-400" : "border-gray-300"}`} 
              {...register("passwordConfirm", {
                required: {
                  value: true,
                  message: "Confirm your password"
                },
                validate: {
                  samePass: value => isSamePass(value) || "Password does not match"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="pass-help">{errors.passwordConfirm?.message}</span>
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
