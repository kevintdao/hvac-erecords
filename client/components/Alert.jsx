import React from 'react'

export default function Alert(props) {
  const title = props.title;
  const text = props.text;
  const type = props.type;

  const styles = {
    success: {
      title: "bg-green-500",
      text: "border-green-400 bg-green-100 text-green-700"

    },
    warning: {
      title: "bg-yellow-500",
      text: "border-yellow-400 bg-yellow-100 text-yellow-700"
    },
    error: {
      title: "bg-red-500",
      text: "border-red-400 bg-red-100 text-red-700"
    }
  }

  const style = styles[type];

  return (
    <div role='alert'>
      {title && <div className={`${style.title} text-white font-bold rounded-t px-4 py-2`} id="alert-title">{title}</div>}
      <div className={`${style.text} ${title ? "border-t-0 rounded-b" : "rounded"} border  px-4 py-3`}>
        <p>{text}</p>
      </div>
    </div>
  )
}
