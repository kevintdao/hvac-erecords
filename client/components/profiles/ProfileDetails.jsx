import React from 'react'

export default function ProfileDetails ({ data }) {
  const styles = {
    container: "",
    div: "py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200",
    label: "text-sm font-medium text-gray-500",
    text: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
  }
  
  return (
    <div className=''>
      <dl>
        {/* Title */}
        <div className={`${styles.div} border-none`}>
          <dt className={styles.label} id='external_id-label'>Title</dt>
          <dd className={styles.text} id='external_id'>{data.title}</dd> 
        </div>

        {/* Description */}
        <div className={styles.div}>
          <dt className={styles.label} id="model_number-label">Description</dt>
          <dd className={styles.text} id="model_number">{data.description}</dd> 
        </div>
      </dl>
    </div>
  )
}
