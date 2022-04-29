import React from 'react'
import Image from 'next/image'

export default function CompanyHelp() {
  const styles = {
    header: 'font-bold text-3xl',
    sub_header: 'font-bold text-xl'
  }

  return (
    <div className='space-y-2'>
      <h2 className={styles.header}>Buildings</h2>
      <h4 className={styles.sub_header}>Create</h4>
      <p>To create a new building:</p>
      <ul>
        <li>Enter in all the required information</li>
      </ul>

      <h4 className={styles.sub_header}>Update</h4>
      <p>To update an existing building:</p>

      <h4 className={styles.sub_header}>Details</h4>
      <p>To view a specific building information:</p>


      <h2 className={styles.header}>Building Managers</h2>


      <h2 className={styles.header}>Units</h2>


      <h2 className={styles.header}>Technicians</h2>


      <h2 className={styles.header}>Maintenance Tasks</h2>


      <h2 className={styles.header}>Maintenance Profiles</h2>
    </div>
  )
}
