import React, { useState } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Alert from '../../components/Alert';
import Link from 'next/link';

export default function Create() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [id, setId] = useState(null);
  const [error, setError] = useState();

  const hvacTypes = [
    "Heating and cooling split system",
    "Hybrid split system",
    "Duct free",
    "Packaged heating and air conditioning system"
  ]

  const styles = {
    inputContainer: "flex flex-col",
    input: "p-2 border rounded",
    inputs2Cols: "grid md:grid-cols-2 gap-4 grid-cols-1",
    inputs3Cols: "grid md:grid-cols-3 gap-4 grid-cols-1",
    button: "p-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800"
  }

  const onSubmit = async (data) => {
    const unit = {
      external_id: data.exId,
      category: data.type,
      serial_number: data.serial,
      model_number: data.model,
      manufacturer: data.manufacturer,
      production_date: data.prodDate,
      installation_date: data.installDate
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/units`, unit);
    if(res.status == 201){
      setId(res.data.id);
    }
    else{

    }
  }

  if(id){
    return (
      <div className='mt-2'>
        <Alert 
          title="Successful"
          text="Successfully created a unit. Click the link below to the newly created unit or all the units"
          type="success"
        />

        <Link href="/units">
          <a >All units</a>        
        </Link>
        <Link href={`/units/${id}`}>
          <a>See created unit</a>        
        </Link>
      </div>
    )
  }

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Create Unit</title>
      </Head>

      {/* Unit Create Page (Create a new unit) */}

      <h2 className="font-bold text-3xl">Create Unit</h2>

      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className={styles.inputs3Cols}>
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

          {/* Model Number */}
          <div className={styles.inputContainer}>
            <label htmlFor="">Model Number</label>
            <input 
              type="text" 
              name="model" 
              id="model" 
              className={`${styles.input} ${errors.model ? "border-red-400" : "border-gray-300"}`}
              {...register('model', {
                required: {
                  value: true,
                  message: "Enter a Model Number"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="ex-id-help">{errors.model?.message}</span>
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
        </div>

        <div className={styles.inputs2Cols}>
          {/* Type */}
          <div className={styles.inputContainer}>
            <label htmlFor="type">Type</label>
            <select 
              name="type" 
              id="type" 
              className={`${styles.input} border-gray-300`}
              {...register('type')}
            >
              {hvacTypes.map((data, index) => (
                <option key={index} value={data}>{data}</option>
              ))}
            </select>
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
        </div>

        <div className={styles.inputs2Cols}>
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
        </div>

        <div>
          <button className={styles.button} id='create-button'>Create Unit</button>
        </div>
      </form>
    </div>
  )
}
