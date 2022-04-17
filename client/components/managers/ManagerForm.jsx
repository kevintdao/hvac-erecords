import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

export default function ManagerForm({ type, data, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: data
  });

  const styles = {
    inputContainer: "flex flex-col",
    input: "p-2 border rounded",
    inputs2Cols: "grid md:grid-cols-2 gap-4 grid-cols-1",
    helpText: "text-sm text-red-700 mt-1",
    button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
  }

  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
        <div className={styles.inputs2Cols}>          
          {/* Name */}
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              className={`${styles.input} ${errors.name ? "border-red-400" : "border-gray-300"}`}
              {...register('name', {
                required: {
                  value: true,
                  message: "Enter a name"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="name-help">{errors.name?.message}</span>
          </div>


          {/* Phone Number */}
          <div className={styles.inputContainer}>
            <label htmlFor="phone_number">Phone Number</label>
            <Controller 
              name='phone_number'
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
                  className={`${styles.input} ${errors.phone_number ? "border-red-400" : "border-gray-300"}`}
                  value={value}
                  onChange={onChange}
                  id="phone_number"
                />
              )}
            />

            <span className={styles.helpText} id="phone-help">{errors.phone_number?.message}</span>
            <small className="text-gray-400 mt-1">US phone number only.</small>
          </div>

          {/* Email */}
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email address</label>
            <input 
              type="text" 
              name="email" 
              id="email" 
              className={`${styles.input} ${errors.email ? "border-red-400" : "border-gray-300"}`}
              {...register("email", {
                required: {
                  value: true,
                  message: "Enter a valid email address"
                },
                pattern: {
                    value : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter valid email"
                },
                maxLength: {
                  value: 320,
                  message: "Email address should not exceed 320 characters"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="email-help">{errors.email?.message}</span>
          </div>
        </div>

        <div>
          <button className={styles.button} id='create-button'>{type}</button>
        </div>
      </form>
    </>
  )
}
