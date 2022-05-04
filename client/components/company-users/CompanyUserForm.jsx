import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

export default function CompanyUserForm({ type, data, onSubmit }) {
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
                            message: "Enter valid email address"
                        },
                        maxLength: {
                        value: 320,
                        message: "Email address should not exceed 320 characters"
                        }
                    })}
                    />
                    <span className='text-sm text-red-700 mt-1' id="email-help">{errors.email?.message}</span>
            </div>
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
                </div>
                <div className={styles.inputs2Cols}>
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
                        <span className='text-sm text-red-700 mt-1' id="street-help">{errors.street?.message}</span>
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
                        <span className='text-sm text-red-700 mt-1' id="city-help">{errors.city?.message}</span>
                    </div>
                </div>
                <div className={styles.inputs2Cols}>
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
                        <span className='text-sm text-red-700 mt-1' id="zip_code-help">{errors.zip_code?.message}</span>
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
                        <span className='text-sm text-red-700 mt-1' id="country-help">{errors.country?.message}</span>
                    </div>
                </div>
            </div>

            <div>
                <button className={styles.button} id='create-button'>{type}</button>
            </div>
        </form>
        </>
    )
}
