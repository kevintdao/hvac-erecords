import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input/input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

export default function TechnicianForm({type, data, onSubmit}) {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: data
    });

    const styles = {
        inputContainer: "flex flex-col",
        input: "p-2 border rounded",
        inputs2Cols: "grid md:grid-cols-2 gap-4 grid-cols-1",
        inputs3Cols: "grid md:grid-cols-3 gap-4 grid-cols-1",
        helpText: "text-sm text-red-700 mt-1",
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
    }

    return (
        <>
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                <div className={styles.inputs2Cols}>
                    {/* First Name */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="first_name">First Name</label>
                        <input 
                        type="text" 
                        name="first_name" 
                        id="first_name" 
                        className={`${styles.input} ${errors.first_name ? "border-red-400" : "border-gray-300"}`}
                        {...register('first_name', {
                            required: {
                            value: true,
                            message: "Enter a First Name"
                            }
                        })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="first_name-help">{errors.first_name?.message}</span>
                    </div>
                    {/* Last Name */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="last_name">Last Name</label>
                        <input 
                        type="text" 
                        name="last_name" 
                        id="last_name" 
                        className={`${styles.input} ${errors.last_name ? "border-red-400" : "border-gray-300"}`}
                        {...register('last_name', {
                            required: {
                            value: true,
                            message: "Enter a Last Name"
                            }
                        })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="last_name-help">{errors.last_name?.message}</span>
                    </div>
                </div>
                <div className={styles.inputs2Cols}>
                    {/* Phone Number */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="phone_number">Phone Number</label>
                        <Controller 
                            name='phone_number'
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Enter a Phone Number"
                                },
                                validate: value => isPossiblePhoneNumber(value) || "Enter a valid Phone Number"
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
                        <span className={styles.helpText} id="phone_number-help">{errors.phone_number?.message}</span>
                        <small className="text-gray-400 mt-1">US Phone Number only.</small>
                    </div>
                    {/* License Number */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="license_number">License Number</label>
                        <input 
                        type="number" 
                        name="license_number" 
                        id="license_number" 
                        className={`${styles.input} ${errors.license_number ? "border-red-400" : "border-gray-300"}`}
                        {...register('license_number', {
                            required: {
                            value: true,
                            message: "Enter a License Number"
                            }
                        })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="license_number-help">{errors.license_number?.message}</span>
                    </div>
                </div>
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
                            message: "Enter an email address"
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
                <div>
                    <button className={styles.button} id='create-button'>{type}</button>
                </div>
            </form>
        </>
    )
}
