import React from 'react'
import Image from 'next/image'
import buildingdetails from '../../public/screenshots/BuildingDetailsPage.png'
import buildingindex from '../../public/screenshots/BuildingIndexPage.png'
import unitcreate from '../../public/screenshots/UnitCreatePage.png'
import unitdetails from '../../public/screenshots/UnitDetailsPage.png'
import unitindex from '../../public/screenshots/UnitIndexPage.png'
import unitupdate from '../../public/screenshots/UnitUpdatePage.png'

export default function ManagerHelp() {
  const styles = {
    header: 'font-bold text-3xl text-center',
    sub_header: 'font-bold text-xl',
    container: 'space-y-2 p-2 border border-gray-200 rounded'
  }

  return (
    <div className='space-y-2'>
      <p>
        As a building manager, you will have access to your buildings and units available to you.
      </p>

      <div className={styles.container}>
        <h2 className={styles.header}>Buildings</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>
            On this page, you can see a table of all the buildings and a short details for each them. 
            For each building on this page, you can view details on a specific building by clicking on the &quot;More Info&quot;
            button or edit a building by clicking on the &quot;Edit&quot; button.
          </p>
          <Image src={buildingindex} alt='buildingIndexPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current building information. There&apos;s button for editing the current building
            or go back to the table of all the buildings.
          </p>
          <Image src={buildingdetails} alt='buildingDetailsPage' />
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.header}>Units</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>
            On this page, you can see a table of all the units and a short details for each them. 
            For each unit on this page, you can view details on a specific unit by clicking on the &quot;More Info&quot;
            button or edit a unit by clicking on the &quot;Edit&quot; button.
          </p>
          <Image src={unitindex} alt='unitIndexPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current unit information. There&apos;s button for editing the current unit
            or go back to the table of all the units.
          </p>
          <Image src={unitdetails} alt='unitDetailsPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the unit as displayed on the page.
            When you try to submit an empty input field, the page will display a red border and message near the input where
            you need to fill in the information.
          </p>
          <Image src={unitcreate} alt='unitCreatePage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a unit will be similar to creating a unit, except that the unit
            information has been prefilled.
          </p>
          <Image src={unitupdate} alt='unitUpdatePage' />
        </div>
      </div>
    </div>
  )
}
