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

  function RenderComponent ({ type, task, index, register, errors }) {
    switch(type){
      case 'Numeric':
        return <ServiceNumeric task={task} index={index} register={register} errors={errors} />
      case 'Selection':
        return <ServiceSelection task={task} index={index} register={register} errors={errors} />
      case 'Text':
        return <ServiceText task={task} index={index} register={register} errors={errors} />
      default:
        return <></>
    }
  }

  return (
    <>
      <form action='' className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {data.map((item, index) => (
          <div key={index} id={`task-${index+1}-container`}>
            <h4 className='font-bold text-xl'>{item.title}</h4>
            <p>{item.description}</p>
            <RenderComponent type={item.rule.type} task={item} index={index} register={register} errors={errors} />
          </div>
        ))}
        <div>
          <button className={styles.button} id='submit-button'>Submit</button>
        </div>
      </form>
    </>
  )
}
