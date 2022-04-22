import React from 'react'
import { useForm } from 'react-hook-form';

export default function UnitForm({ type, data, buildings, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data
  });

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
    button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
  }

  return (
    <>
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
        <div className={styles.inputContainer}>
          <label htmlFor="building">Building</label>
          <select 
            type="text" 
            name="building" 
            id="building" 
            className={`${styles.input} border-gray-300`}
            {...register('building')}
          >
            {buildings.map((building, i) => (
              <option value={building.id} key={building.id}>{`${building.site_name} (${building.street} ${building.city} ${building.zip_code})`}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.inputs3Cols}>
          {/* External ID */}
          <div className={styles.inputContainer}>
            <label htmlFor="external_id">External ID</label>
            <input 
              type="text" 
              name="external_id" 
              id="external_id" 
              className={`${styles.input} border-gray-300`}
              {...register('external_id')}
            />
          </div>

          {/* Model Number */}
          <div className={styles.inputContainer}>
            <label htmlFor="model_number">Model Number</label>
            <input 
              type="text" 
              name="model_number" 
              id="model_number" 
              className={`${styles.input} ${errors.model_number ? "border-red-400" : "border-gray-300"}`}
              {...register('model_number', {
                required: {
                  value: true,
                  message: "Enter a Model Number"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="model_number-help">{errors.model_number?.message}</span>
          </div>

          {/* Serial Number */}
          <div className={styles.inputContainer}>
            <label htmlFor="serial_number">Serial Nunber</label>
            <input 
              type="text" 
              name="serial_number" 
              id="serial_number" 
              className={`${styles.input} ${errors.serial_number ? "border-red-400" : "border-gray-300"}`}
              {...register('serial_number', {
                required: {
                  value: true,
                  message: "Enter a Serial Number"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="serial_number-help">{errors.serial_number?.message}</span>
          </div>
        </div>

        <div className={styles.inputs2Cols}>
          {/* Type */}
          <div className={styles.inputContainer}>
            <label htmlFor="category">Type</label>
            <select 
              name="category" 
              id="category" 
              className={`${styles.input} border-gray-300`}
              {...register('category')}
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
            <span className='text-sm text-red-700 mt-1' id="manufacturer-help">{errors.manufacturer?.message}</span>
          </div>
        </div>

        <div className={styles.inputs2Cols}>
          {/* Production Date */}
          <div className={styles.inputContainer}>
            <label htmlFor="production_date">Production Date</label>
            <input 
              type="date" 
              name="production_date" 
              id="production_date" 
              className={`${styles.input} ${errors.production_date ? "border-red-400" : "border-gray-300"}`}
              {...register('production_date', {
                required: {
                  value: true,
                  message: "Enter a Production Date"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="production_date-help">{errors.production_date?.message}</span>
          </div>

          {/* Installation Date */}
          <div className={styles.inputContainer}>
            <label htmlFor="installation_date">Installation Date</label>
            <input 
              type="date" 
              name="installation_date" 
              id="installation_date" 
              className={`${styles.input} ${errors.installation_date ? "border-red-400" : "border-gray-300"}`}
              {...register('installation_date', {
                required: {
                  value: true,
                  message: "Enter an Installation Date"
                }
              })}
            />
            <span className='text-sm text-red-700 mt-1' id="installation_date-help">{errors.installation_date?.message}</span>
          </div>
        </div>

        <div>
          <button className={styles.button} id='create-button'>{type}</button>
        </div>
      </form>
    </>
  )
}
