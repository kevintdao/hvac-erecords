import React from 'react'

export default function UnitDetails({ data }) {
  const styles = {
    container: "",
    div: "py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200",
    label: "text-sm font-medium text-gray-500",
    text: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
  }
  
  return (
    <div className=''>
      <dl>
        {/* External ID */}
        <div className={`${styles.div} border-none`}>
          <dt className={styles.label}>External ID</dt>
          <dd className={styles.text}>{data.external_id}</dd> 
        </div>

        {/* Model Number */}
        <div className={styles.div}>
          <dt className={styles.label}>Model Number</dt>
          <dd className={styles.text}>{data.model_number}</dd> 
        </div>

        {/* Serial Number */}
        <div className={styles.div}>
          <dt className={styles.label}>Serial Number</dt>
          <dd className={styles.text}>{data.serial_number}</dd> 
        </div>

        {/* Type */}
        <div className={styles.div}>
          <dt className={styles.label}>Type</dt>
          <dd className={styles.text}>{data.category}</dd> 
        </div>

        {/* Manufacturer */}
        <div className={styles.div}>
          <dt className={styles.label}>Manufacturer</dt>
          <dd className={styles.text}>{data.manufacturer}</dd> 
        </div>

        {/* Production Date */}
        <div className={styles.div}>
          <dt className={styles.label}>Production Date</dt>
          <dd className={styles.text}>{data.production_date}</dd> 
        </div>

        {/* Installation Date */}
        <div className={styles.div}>
          <dt className={styles.label}>Installation Date</dt>
          <dd className={styles.text}>{data.installation_date}</dd> 
        </div>
      </dl>
    </div>
  )
}
