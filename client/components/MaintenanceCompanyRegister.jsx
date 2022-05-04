import React, { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input/input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

export default function MaintenanceCompanyRegister ({ onSubmit }) {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const passRef = useRef(null)

    const { ref, ...rest } = register('password', {
        required: {
          value: true,
          message: 'Enter a password'
        },
        minLength: {
          value: 8,
          message: 'Must contains at least 8 characters'
        },
        maxLength: {
          value: 32,
          message: 'Must not exceed 32 characters'
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          message: 'Must contains at least 1 special character and 1 number'
        },
    })

    const isSamePass = (passConf) => {
        if (passRef.current.value != passConf) {
          return false
        }
        return true
    }

    const styles = {
        inputContainer: "flex flex-col",
        input: "p-2 border rounded",
        helpText: "text-sm text-red-700 mt-1"
    }

    return (
        <div className='mt-2'>
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <h2 className='font-bold text-3xl'>Maintenance Company Register</h2>

                <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
                    {/* Email */}
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
                            message: "Enter an Email"
                            },
                            pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: "Enter a Valid Email"
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

                    {/* password */}
                    <div className={styles.inputContainer}>
                        <label htmlFor='password'>Password</label>
                        <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        ref={(e) => {
                            ref(e)
                            passRef.current = e
                        }}
                        className={`p-2 border rounded ${errors.password ? 'border-red-400' : 'border-gray-300'}`} 
                        {...rest}
                        />
                        <span className='text-sm text-red-700 mt-1' id='pass-help'>{errors.password?.message}</span>
                        <small className='text-gray-400 mt-1'>Password must contains at least 8 characters, 1 special character, and 1 number.</small>
                        <small className='text-gray-400 mt-1'>Password should not exceed 32 characters.</small>
                    </div>

                    {/* confirm password */}
                    <div className={styles.inputContainer}>
                    <label htmlFor='password-confirm'>Confirm Password</label>
                    <input 
                        type='password' 
                        name='password-confirm' 
                        id='password-confirm' 
                        className={`p-2 border rounded ${errors.passwordConfirm ? 'border-red-400' : 'border-gray-300'}`} 
                        {...register('passwordConfirm', {
                        required: {
                            value: true,
                            message: 'Confirm your password'
                        },
                        validate: {
                            samePass: value => isSamePass(value) || 'Passwords do not match'
                        }
                        })}
                    />
                    <span className='text-sm text-red-700 mt-1' id='pass-confirm-help'>{errors.passwordConfirm?.message}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                    {/* Company Name */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="name">Company Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        className={`${styles.input} ${errors.name ? "border-red-400" : "border-gray-300"}`}
                        {...register('name', {
                            required: {
                            value: true,
                            message: "Enter a Maintenance Company Name"
                            }
                        })}
                        />
                        <span className={styles.helpText} id="name-help">{errors.name?.message}</span>
                    </div>

                    {/* Phone Number */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="phone">Phone Number</label>
                        <Controller 
                        name='phone'
                        control={control}
                        rules={{
                            required: {
                            value: true,
                            message: "Enter a Phone Number"
                            },
                            validate: value => isPossiblePhoneNumber(value) || "Enter a Valid Phone Number"
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
                </div>

                <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                    {/* Street */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="street">Street</label>
                        <input 
                        type="text" 
                        name="street" 
                        id="street" 
                        className={`${styles.input} ${errors.street ? "border-red-400" : "border-gray-300"}`}
                        {...register('street', {
                            required: {
                            value: true,
                            message: "Enter a Street"
                            }
                        })}
                        />
                        <span className={styles.helpText} id="street-help">{errors.street?.message}</span>
                    </div>

                    {/* City */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="city">City</label>
                        <input 
                        type="text" 
                        name="city" 
                        id="city" 
                        className={`${styles.input} ${errors.city ? "border-red-400" : "border-gray-300"}`}
                        {...register('city', {
                            required: {
                            value: true,
                            message: "Enter a City"
                            }
                        })}
                        />
                        <span className={styles.helpText} id="city-help">{errors.city?.message}</span>
                    </div>
                </div>
        
                <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                    {/* Zip Code */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="zip_code">Zip Code</label>
                        <input 
                        type="text" 
                        name="zip_code" 
                        id="zip_code" 
                        className={`${styles.input} ${errors.zip_code ? "border-red-400" : "border-gray-300"}`}
                        {...register('zip_code', {
                            required: {
                            value: true,
                            message: "Enter a Zip Code"
                            }
                        })}
                        />
                        <span className={styles.helpText} id="zip_code-help">{errors.zip_code?.message}</span>
                    </div>

                    {/* Country */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="country">Country</label>
                        <input 
                        type="text" 
                        name="country" 
                        id="country" 
                        className={`${styles.input} ${errors.country ? "border-red-400" : "border-gray-300"}`}
                        {...register('country', {
                            required: {
                            value: true,
                            message: "Enter a Country"
                            }
                        })}
                        />
                        <span className={styles.helpText} id="country-help">{errors.country?.message}</span>
                    </div>
                </div>

                {/* submit button */}
                <button className='px-4 py-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800' id='create-button'>Create</button>
            </form>
        </div>
      )
}