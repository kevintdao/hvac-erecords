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
        {/* Buidling */}
        <div className={`${styles.div} border-none`}>
          <dt className={styles.label} id='building-label'>Building</dt>
          <dd className={styles.text} id='building'>{`${data.building.site_name} (${data.building.street}, ${data.building.city} ${data.building.zip_code})`}</dd> 
        </div>

        {/* External ID */}
        <div className={styles.div}>
          <dt className={styles.label} id='external_id-label'>External ID</dt>
          <dd className={styles.text} id='external_id'>{data.external_id}</dd> 
        </div>

        {/* Model Number */}
        <div className={styles.div}>
          <dt className={styles.label} id="model_number-label">Model Number</dt>
          <dd className={styles.text} id="model_number">{data.model_number}</dd> 
        </div>

        {/* Serial Number */}
        <div className={styles.div}>
          <dt className={styles.label} id="serial_number-label">Serial Number</dt>
          <dd className={styles.text} id="serial_number">{data.serial_number}</dd> 
        </div>

        {/* Type */}
        <div className={styles.div}>
          <dt className={styles.label} id="category-label">Type</dt>
          <dd className={styles.text} id="category">{data.category}</dd> 
        </div>

        {/* Manufacturer */}
        <div className={styles.div}>
          <dt className={styles.label} id="manufacturer-label">Manufacturer</dt>
          <dd className={styles.text} id="manufacturer">{data.manufacturer}</dd> 
        </div>

        {/* Production Date */}
        <div className={styles.div}>
          <dt className={styles.label} id="production_date-label">Production Date</dt>
          <dd className={styles.text} id="production_date">{data.production_date}</dd> 
        </div>

        {/* Installation Date */}
        <div className={styles.div}>
          <dt className={styles.label} id="installation_date-label">Installation Date</dt>
          <dd className={styles.text} id="installation_date">{data.installation_date}</dd> 
        </div>
      </dl>
    </div>
  )
}
