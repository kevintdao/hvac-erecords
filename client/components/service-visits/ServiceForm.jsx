import React from 'react'
import ServiceNumeric from './ServiceNumeric'
import ServiceSelection from './ServiceSelection'
import ServiceText from './ServiceText'
import { useForm } from 'react-hook-form'
import { Temporal } from '@js-temporal/polyfill'

export default function ServiceForm ({ data, savedData, name, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: savedData
  })

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  const onChange = (taskId, name, e) => {
    let obj = JSON.parse(localStorage.getItem(name))
    let key = {
      value: e.target.value,
      completed_at: Temporal.Now.instant().round('second').toString()
    }
    obj[taskId] = key
    localStorage.setItem(name, JSON.stringify(obj))
  }

  return (
    <>
      <form action='' className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {data.map((item, index) => (
          <div key={index} id={`task-${index+1}-container`}>
            <h4 className='font-bold text-xl' id={`title-${index+1}`}>{item.title}</h4>
            <p className='mb-1' id={`desc-${index+1}`}>{item.description}</p>
            {
              item.rule.type == 'Numeric' ? <ServiceNumeric task={item} index={index} register={register} errors={errors} name={name} onChange={onChange} /> :
              item.rule.type == 'Selection' ? <ServiceSelection task={item} index={index} register={register} errors={errors} name={name} onChange={onChange} /> :
              item.rule.type == 'Text' ? <ServiceText task={item} index={index} register={register} errors={errors} name={name} onChange={onChange} /> : ''
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
