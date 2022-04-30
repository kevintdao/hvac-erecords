import React from "react";
import { useForm, Controller } from 'react-hook-form'

export default function BuildingForm({ type, data, onSubmit, managers }){
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
                    {/* Building manager */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="manager">Building Manager</label>
                        <select 
                            type="text" 
                            name="manager" 
                            id="manager" 
                            className={`${styles.input} border-gray-300`}
                            {...register('manager')}
                        >
                            {managers.map((manager, i) => (
                                <option value={manager.id} key={manager.id}>{`${manager.name} (${manager.phone_number})`}</option>
                            ))}
                        </select>
                    </div>
                    {/* Site Name */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="site_name">Site Name</label>
                        <input 
                        type="text" 
                        name="site_name" 
                        id="site_name" 
                        className={`${styles.input} ${errors.site_name ? "border-red-400" : "border-gray-300"}`}
                        {...register('site_name', {
                            required: {
                            value: true,
                            message: "Enter a Site Name"
                            }
                        })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="site_name-help">{errors.site_name?.message}</span>
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
                <div>
                    <button className={styles.button} id='create-button'>{type}</button>
                </div>
            </form>
        </>
    )
}
