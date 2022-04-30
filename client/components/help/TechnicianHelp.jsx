import React from 'react'
import Image from 'next/image'
import serviceplans from '../../public/screenshots/ServicePlansPage.png'
import servicevisits from '../../public/screenshots/ServiceVisitsPage.png'

export default function TechnicianHelp() {
  const styles = {
    header: 'font-bold text-3xl',
    sub_header: 'font-bold text-xl'
  }

  return (
    <div className='space-y-2'>
      <p>
        As a technician, you will need to scan a QR code on a unit to be able to access
        the informations for that specific unit. Once the QR code is scanned, you will be taken
        to the Service Plans page for that unit. You can then complete a service profile for that unit.
      </p>
      <div>
        <h2 className={styles.header}>Service Plans</h2>
        <p>
          After scanning a QR code, you will be taken to a Service Plans page for that unit.

        </p>
        <Image src={serviceplans} />
      </div>

      <div>
        <h2 className={styles.header}>Service Visits</h2>
        <p>
          
        </p>
        <Image src={servicevisits} />
      </div>
    </div>
  )
}
