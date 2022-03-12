import React from 'react'
import { useForm } from 'react-hook-form'

export default function TechnicianForm({type, data, onSubmit}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: data
    });

    const styles = {
        inputContainer: "flex flex-col",
        input: "p-2 border rounded",
        inputs2Cols: "grid md:grid-cols-2 gap-4 grid-cols-1",
        inputs3Cols: "grid md:grid-cols-3 gap-4 grid-cols-1",
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
    }

    return (
        <>
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                <div className={styles.inputs3Cols}>
                    {/* User ID */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="user_id">User ID</label>
                        <input 
                        type="number" 
                        name="user_id" 
                        id="user_id" 
                        className={`${styles.input} ${errors.user_id ? "border-red-400" : "border-gray-300"}`}
                        {...register('user_id', {
                            required: {
                            value: true,
                            message: "Enter a User ID"
                            }
                        })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="user_id-help">{errors.user_id?.message}</span>
                    </div>
                    {/* Company ID */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="company_id">Company ID</label>
                        <input 
                        type="number" 
                        name="company_id" 
                        id="company_id" 
                        className={`${styles.input} ${errors.company_id ? "border-red-400" : "border-gray-300"}`}
                        {...register('company_id', {
                            required: {
                            value: true,
                            message: "Enter a Company ID"
                            }
                        })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="company_id-help">{errors.company_id?.message}</span>
                    </div>
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
                    {/* Phone Number */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="phone_number">Phone Number</label>
                        <input 
                        type="text" 
                        name="phone_number" 
                        id="phone_number" 
                        className={`${styles.input} ${errors.phone_number ? "border-red-400" : "border-gray-300"}`}
                        {...register('phone_number', {
                            required: {
                            value: true,
                            message: "Enter a Phone Number"
                            }
                        })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="phone_number-help">{errors.phone_number?.message}</span>
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
                <div>
                    <button className={styles.button} id='create-button'>{type}</button>
                </div>
            </form>
        </>
    )
}
