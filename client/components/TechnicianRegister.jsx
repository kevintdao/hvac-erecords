import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input/input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

export default function BuildingOwnerRegister() {
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const styles = {
    inputContainer: "flex flex-col",
    input: "p-2 border rounded",
    helpText: "text-sm text-red-700 mt-1"
  }

  const onSubmit = (data) => {
    // call server api to verify information
  }

  return (
    <div className='mt-2'>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <h2 className='font-bold text-3xl'>Technician Account Creation</h2>

        <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
          {/* first name */}
          <div className={styles.inputContainer}>
            <label htmlFor="first-name">First Name</label>
            <input 
              type="text" 
              name="first-name" 
              id="first-name" 
              className={`${styles.input} ${errors.fname ? "border-red-400" : "border-gray-300"}`}
              {...register('fname', {
                required: {
                  value: true,
                  message: "Enter a first name"
                }
              })}
            />
            <span className={styles.helpText} id="fname-help">{errors.fname?.message}</span>
          </div>

          {/* last name */}
          <div className={styles.inputContainer}>
            <label htmlFor="last-name">Last Name</label>
            <input 
              type="text" 
              name="last-name" 
              id="last-name" 
              className={`${styles.input} ${errors.lname ? "border-red-400" : "border-gray-300"}`}
              {...register('lname', {
                required: {
                  value: true,
                  message: "Enter a last name"
                }
              })}
            />
            <span className={styles.helpText} id="lname-help">{errors.lname?.message}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
          {/* email */}
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              id="email" 
              className={`${styles.input} ${errors.email ? "border-red-400" : "border-gray-300"}`} 
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
            <span className={styles.helpText} id="email-help">{errors.email?.message}</span>
            <small className="text-gray-400 mt-1">Email should not exceed 320 characters.</small>
          </div>

          {/* phone number */}
          <div className={styles.inputContainer}>
            <label htmlFor="phone">Phone Number</label>
            <Controller 
              name='phone'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Enter a phone number"
                },
                validate: value => isPossiblePhoneNumber(value) || "Enter a valid phone number"
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  country="US"
                  className={`${styles.input} ${errors.phone ? "border-red-400" : "border-gray-300"}`}
                  value={value}
                  onChange={onChange}
                  id="phone"
                />
              )}
            />
              
            <span className={styles.helpText} id="phone-help">{errors.phone?.message}</span>
            <small className="text-gray-400 mt-1">US phone number only.</small>
          </div>
          
          {/* license number */}
          <div className={styles.inputContainer}>
            <label htmlFor="license">License Number</label>
            <input 
              type="text" 
              name="license" 
              id="license"
              className={`${styles.input} border-gray-300`}
              {...register('license')}
            />
          </div>
        </div>


        {/* submit button */}
        <button className='px-4 py-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800' id='create-button'>Create</button>
      </form>
    </div>
  )
}
