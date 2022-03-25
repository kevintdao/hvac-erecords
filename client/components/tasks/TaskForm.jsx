import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TypeNumberic from './TypeNumberic'
import TypeSelection from './TypeSelection'
import TypeText from './TypeText'

export default function TaskForm ({ type, data, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: data
  })
  const [selected, setSelected] = useState('')

  const types = ['Selection', 'Text', 'Numberic']

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

  function Type ({ type }) {
    switch(type){
      case 'Selection':
        return (
          <>
            <div className={styles.inputs2Cols}>
              <div className={styles.inputContainer}>
                <label htmlFor='numChoices'>Number of choices</label>
                <Controller name='numChoices' control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Enter a number of choices"
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <input type='number' name='numChoices' id='numChoices'
                        className={`${styles.input} ${errors.numChoices ? 'border-red-400' : 'border-gray-300'}`}
                        value={value}
                        onChange={onChange}
                      />
                      <span className='text-sm text-red-700 mt-1' id='numChoices-help'>{errors.numChoices?.message}</span>
                      <TypeSelection number={value} />
                    </>
                  )}
                />
              </div>
            </div>
          </>
        )
      case 'Numberic':
        return (<TypeNumberic />)
      case 'Text':
        return (<TypeText />)
    }
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
            <select name='type' id='type' className={`${styles.input} border-gray-300`} onChange={renderSelected} defaultValue=''>
              <option value='' disabled>Select a type</option>
              {types.map((item, index) => (
                <option value={item} key={index}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.inputContainer}>
          {/* Render selected type */}
          {selected && <Type type={selected} />}
        </div>

        <div>
          <button className={styles.button} id='create-button'>{type}</button>
        </div>
      </form>
    </>
  )
}
