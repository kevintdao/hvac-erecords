import React from 'react'

export default function ManagerDetails({ data }) {
  const styles = {
    container: "",
    div: "py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200",
    label: "text-sm font-medium text-gray-500",
    text: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
  }
  
  return (
    <div className=''>
      <dl>
        {/* Name */}
        <div className={`${styles.div} border-none`}>
          <dt className={styles.label} id='name-label'>Name</dt>
          <dd className={styles.text} id='name'>{data.name}</dd> 
        </div>

        {/* Phone Number */}
        <div className={styles.div}>
          <dt className={styles.label} id="phone_number-label">Phone Number</dt>
          <dd className={styles.text} id="phone_number">{data.phone_number}</dd> 
        </div>
      </dl>
    </div>
  )
}
