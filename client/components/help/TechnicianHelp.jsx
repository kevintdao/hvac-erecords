import React from 'react'
import Image from 'next/image'
import serviceplans from '../../public/screenshots/ServicePlansPage.png'
import servicevisits from '../../public/screenshots/ServiceVisitsPage.png'
import records from '../../public/screenshots/RecordsTechnicianPage.png'

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
          On this page, you can view the unit details as well as view the historic maintenance records for that unit
          by clicking on the &quot;Maintenance Data&quot; button. Below the unit details is the tables of the maintenance
          plans associated with that unit.
          The &quot;Available Plans&quot; table will display all the plans where current date is between the start and end date.
          If plans are not in the start and end date range, then it will be displayed in the &quot;Other Plans&quot; table.
          The technician can complete any plan on the page by clicking on the &quot;Complete&quot; link. This will take you
          to the Service Visits page.
        </p>
        <Image src={serviceplans} alt='servicePlansPage' />
      </div>

      <div>
        <h2 className={styles.header}>Unit Records</h2>
        <p>
          On the Unit Records, you can view the previous maintenance records performed on the current unit.
          You can have an option to download the CSV/PDF version of the record.
          There's a button that will take you back to the Service Visits page.
        </p>
        <Image src={records} alt='unitRecords' />
      </div>

      <div>
        <h2 className={styles.header}>Service Visits</h2>
        <p>
          On the Service Visits page, there's a title and description for the current maintenance plan. Below that are the
          maintenance tasks associated with the current maintenance plan. After selecting or typing something in the input field,
          those inputs will be saved locally so that if you close the page or want to comeback later, your previous inputs will
          still be saved.
        </p>
        <Image src={servicevisits} alt='serviceVisitsPage' />
      </div>
    </div>
  )
}
