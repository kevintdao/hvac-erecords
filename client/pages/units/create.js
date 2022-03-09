import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form';

export default function create() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const hvacTypes = [
    "Heating and cooling split system",
    "Hybrid split system",
    "Duct free",
    "Packaged heating and air conditioning system"
  ]

  const styles = {
    inputContainer: "flex flex-col",
    input: "p-2 border rounded"
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <Head>
        <title>Create Unit</title>
      </Head>

      {/* Unit Create Page (Create a new unit) */}

      <h2 className="font-bold text-3xl">Create Unit</h2>

      {/* Type */}
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className={styles.inputContainer}>
          <label htmlFor="type">Type</label>
          <select name="type" id="type" className={`${styles.input} border-gray-300`}>
            {hvacTypes.map((data, index) => (
              <option key={index} value={index}>{data}</option>
            ))}
          </select>
        </div>

        {/* External ID */}
        <div className={styles.inputContainer}>
          <label htmlFor="ex-id">External ID</label>
          <input 
            type="text" 
            name="ex-id" 
            id="ex-id" 
            className={`${styles.input} ${errors.exId ? "border-red-400" : "border-gray-300"}`}
            {...register('exId', {
              required: {
                value: true,
                message: "Enter an External ID"
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id="ex-id-help">{errors.exId?.message}</span>
        </div>

        {/* Serial Number */}
        <div className={styles.inputContainer}>
          <label htmlFor="serial">Serial Nunber</label>
          <input 
            type="text" 
            name="serial" 
            id="serial" 
            className={`${styles.input} ${errors.serial ? "border-red-400" : "border-gray-300"}`}
            {...register('serial', {
              required: {
                value: true,
                message: "Enter a Serial Number"
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id="serial-help">{errors.serial?.message}</span>
        </div>

        {/* Manufacturer */}
        <div className={styles.inputContainer}>
          <label htmlFor="manufacturer">Manufacturer</label>
          <input 
            type="text" 
            name="manufacturer" 
            id="manufacturer" 
            className={`${styles.input} ${errors.manufacturer ? "border-red-400" : "border-gray-300"}`}
            {...register('manufacturer', {
              required: {
                value: true,
                message: "Enter a Manufacturer"
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id="serial-help">{errors.manufacturer?.message}</span>
        </div>

        {/* Production Date */}
        <div className={styles.inputContainer}>
          <label htmlFor="prod-date">Production Date</label>
          <input 
            type="date" 
            name="prod-date" 
            id="prod-date" 
            className={`${styles.input} ${errors.prodDate ? "border-red-400" : "border-gray-300"}`}
            {...register('prodDate', {
              required: {
                value: true,
                message: "Enter a Production Date"
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id="prod-date-help">{errors.prodDate?.message}</span>
        </div>

        {/* Installation Date */}
        <div className={styles.inputContainer}>
          <label htmlFor="install-date">Installation Date</label>
          <input 
            type="date" 
            name="install-date" 
            id="install-date" 
            className={`${styles.input} ${errors.installDate ? "border-red-400" : "border-gray-300"}`}
            {...register('installDate', {
              required: {
                value: true,
                message: "Enter an Installation Date"
              }
            })}
          />
          <span className='text-sm text-red-700 mt-1' id="install-date-help">{errors.installDate?.message}</span>
        </div>

        <div className=''>
          <button className='p-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800' id='create-button'>Create Unit</button>
        </div>
      </form>
    </div>
  )
}
