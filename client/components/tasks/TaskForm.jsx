import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TypeNumberic from './TypeNumberic'
import TypeSelection from './TypeSelection'

export default function TaskForm ({ type, data, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data
  })

  const tasks = ['Numberic', 'Selection', 'Text']
  const [selected, setSelected] = useState(tasks[0])
  const [choices, setChoices] = useState(0)

  var rows = []
  for(let i = 0; i < choices; i++) rows.push(i)


  const styles = {
    inputContainer: 'flex flex-col',
    input: 'p-2 border rounded',
    inputs2Cols: 'grid md:grid-cols-2 gap-4 grid-cols-1',
    helpText: 'text-sm text-red-700 mt-1',
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  const renderSelected = (event) => {
    setSelected(event.target.value)
  }

  return (
    <>
      <form action='' method='post' onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-2'>
        <div className={styles.inputs2Cols}>
          {/* Title */}
          <div className={styles.inputContainer}>
            <label htmlFor='title'>Title</label>
            <input 
              type='text'
              id='title'
              name='title'
              className={`${styles.input} ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
              {...register('title', {
                required: {
                  value: true,
                  message: 'Enter a title'
                }
              })}           
            />
            <span className='text-sm text-red-700 mt-1' id='title-help'>{errors.title?.message}</span>
          </div>

          {/* Description */}
          <div className={styles.inputContainer}>
            <label htmlFor='description'>Description</label>
            <input 
              type='text'
              id='description'
              name='description'
              className={`${styles.input} ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
              {...register('description', {
                required: {
                  value: true,
                  message: 'Enter a description'
                }
              })}           
            />
            <span className='text-sm text-red-700 mt-1' id='description-help'>{errors.description?.message}</span>
          </div>

          {/* Type of task selection */}
          <div className={styles.inputContainer}>
            <label htmlFor='type'>Type</label>
            <select name='type' id='type' className={`${styles.input} border-gray-300`} 
              {...register('type', {
                onChange: renderSelected
              })}
            >
              {tasks.map((item, index) => (
                <option value={item} key={index}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.inputContainer}>
          {/* Render selected type */}
          {/* Selection type */}
          {selected == 'Selection' && 
            <div className={styles.inputs2Cols}>
              <div className={styles.inputContainer}>
                <label htmlFor='choices'>{`Number of choices (${choices})`}</label>
                <input type='range' name='choices' id='choices' min={0} max={10} 
                  value={choices}
                  {...register('selection.choices', {
                    onChange: (e) => setChoices(e.target.value)
                  })}
                />
                <TypeSelection number={choices} register={register} errors={errors} />
              </div>
            </div>
          }

          {/* Numberic type */}
          {selected == 'Numberic' && 
            <div className={styles.inputs2Cols}>
              <TypeNumberic register={register} errors={errors} />
            </div>
          }
        </div>

        <div>
          <button className={styles.button} id='create-button'>{type}</button>
        </div>
      </form>
    </>
  )
}
