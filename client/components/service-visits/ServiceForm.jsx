import React from 'react'
import ServiceNumeric from './ServiceNumeric'
import ServiceSelection from './ServiceSelection'
import ServiceText from './ServiceText'

export default function ServiceForm ({ data }) {
  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
  }

  function RenderComponent ({ type, task, index }) {
    switch(type){
      case 'Numeric':
        return <ServiceNumeric task={task} index={index} />
      case 'Selection':
        return <ServiceSelection task={task} index={index} />
      case 'Text':
        return <ServiceText task={task} index={index} />
      default:
        return <></>
    }
  }

  return (
    <>
      <form action='' className='space-y-4'>
        {data.map((item, index) => (
          <div key={index} id={`task-${index+1}-container`}>
            <h4 className='font-bold text-xl'>{item.title}</h4>
            <p>{item.description}</p>
            <RenderComponent type={item.rule.type} task={item} index={index} />
          </div>
        ))}
        <div>
          <button className={styles.button} id='submit-button'>Submit</button>
        </div>
      </form>
    </>
  )
}
