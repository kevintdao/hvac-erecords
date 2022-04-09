import React from 'react'
import ServiceNumeric from './ServiceNumeric'
import ServiceSelection from './ServiceSelection'
import ServiceText from './ServiceText'

export default function ServiceForm ({ data }) {
  function RenderComponent ({ type }) {
    switch(type){
      case 'Numeric':
        return <ServiceNumeric />
      case 'Selection':
        return <ServiceSelection />
      case 'Text':
        return <ServiceText />
      default:
        return <></>
    }
  }

  return (
    <div>
      {data.map((item, index) => (
        <RenderComponent type={item.rule.type} key={index} />
      ))}
    </div>
  )
}
