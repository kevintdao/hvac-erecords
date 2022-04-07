import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProfileAssign ({ profiles, plan, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, unregister } = useForm({
    defaultValues: plan
  })
  const [checked, setChecked] = useState(plan?.is_required || false)

  const styles = {
    inputs2Cols: 'grid md:grid-cols-2 gap-4 grid-cols-1',
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    addButton: 'p-2 bg-green-700 rounded text-white text-center hover:bg-green-800',
    deleteButton: 'p-2 bg-red-700 rounded text-white text-center hover:bg-red-800',
    input: 'p-2 border rounded border-gray-300',
    inputContainer: 'flex flex-col',
    checkbox: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
  }

  const onChange = (e) => {
    setChecked(!checked)
  }

  return (
    <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className='space-y-2 mt-2'>
      <div className='space-y-2'>
        <div className={styles.inputContainer}>
          <label htmlFor='profiles'>Profiles</label>
          <select name="profiles" id="profiles" className={styles.input}
            {...register('profile')}
          >
            {profiles.map((item, index) => (
              <option value={item.id} key={item.id}>{`${item.title} (${item.description})`}</option>
            ))}
          </select>
        </div>
        
        <div className='flex flex-row space-x-4'>
          <div>
            <label htmlFor='is-planned'>Is Planned</label>
            <input type="checkbox" name='is-planned' id='is-planned' className={styles.checkbox}
              {...register('is_required', {
                onChange: (e) => onChange(e) 
              })}
            />
          </div>
          <div>
            <label htmlFor='is-repeating'>Repeating</label>
            <input type="checkbox" name='is-repeating' id='is-repeating' className={styles.checkbox}
              {...register('is_repeating')}
            />
          </div>
        </div>

        {checked && 
          <div className={styles.inputs2Cols}>
            <div className={styles.inputContainer}>
              <label htmlFor='start-date'>Start Date</label>
              <input type="date" name='start-date' id='start-date' className={`${styles.input} ${errors.start_date ? "border-red-400" : "border-gray-300"}`}
                {...register('start_date',{
                  required: {
                    value: true,
                    message: "Enter a Start Date"
                  }
                })}
              />
              <span className='text-sm text-red-700 mt-1' id="start_date-help">{errors.start_date?.message}</span>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor='end-date'>End Date</label>
              <input type="date" name='end-date' id='end-date' className={`${styles.input} ${errors.end_date ? "border-red-400" : "border-gray-300"}`}
                {...register('end_date', {
                  required: {
                    value: true,
                    message: "Enter an End Date"
                  }
                })}
              />
              <span className='text-sm text-red-700 mt-1' id="end_date-help">{errors.end_date?.message}</span>
            </div>
          </div>
        }
        <button className={styles.button} id='assign-button'>Assign</button>
      </div>
    </form>
  )
}
