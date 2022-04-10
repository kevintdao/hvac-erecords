import React from 'react'
import ServiceNumeric from './ServiceNumeric'
import ServiceSelection from './ServiceSelection'
import ServiceText from './ServiceText'
import { useForm } from 'react-hook-form'

export default function ServiceForm ({ data, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  return (
    <>
      <form action='' className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {data.map((item, index) => (
          <div key={index} id={`task-${index+1}-container`}>
            <h4 className='font-bold text-xl' id={`title-${index+1}`}>{item.title}</h4>
            <p className='mb-1' id={`desc-${index+1}`}>{item.description}</p>
            {
              item.rule.type == 'Numeric' ? <ServiceNumeric task={item} index={index} register={register} errors={errors} /> :
              item.rule.type == 'Selection' ? <ServiceSelection task={item} index={index} register={register} errors={errors} /> :
              item.rule.type == 'Text' ? <ServiceText task={item} index={index} register={register} errors={errors} /> : ''
            }
          </div>
        ))}
        <div>
          <button className={styles.button} id='submit-button'>Submit</button>
        </div>
      </form>
    </>
  )
}
