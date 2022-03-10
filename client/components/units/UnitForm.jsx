import React from 'react'
import { useForm } from 'react-hook-form';

export default function UnitForm({ type, data, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

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
    button: "p-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800",
  }

  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
        <div className={styles.inputs3Cols}>
          {/* External ID */}
          <div className={styles.inputContainer}>
            <label htmlFor="ex-id">External ID</label>
            <input 
              type="text" 
              name="ex-id" 
              id="ex-id" 
              className={`${styles.input} ${errors.exId ? "border-red-400" : "border-gray-300"}`}
              value={data?.external_id}
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
              value={data?.model_number}
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
              value={data?.serial_number}
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
              value={data?.category}
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
              value={data?.manufacturer}
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
              value={data?.production_date}
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
              value={data?.installation_date}
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
          <button className={styles.button} id='create-button'>{type} Unit</button>
        </div>
      </form>
    </>
  )
}
