import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input/input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

export default function MaintenanceCompanyRegister() {
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
                <h2 className='font-bold text-3xl'>Maintenance Company Account Creation</h2>
        
                <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
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
        
                <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
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
        
        
                {/* submit button */}
                <button className='px-4 py-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800' id='create-button'>Create</button>
            </form>
        </div>
      )
}