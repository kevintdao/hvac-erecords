import React from 'react'
import Image from 'next/image'
import buildingdetails from '../../public/screenshots/BuildingDetailsPage.png'
import buildingindex from '../../public/screenshots/BuildingIndexPage.png'
import buildingupdate from '../../public/screenshots/BuildingUpdatePage.png'
import buildingcreate from '../../public/screenshots/BuildingCreatePage.png'
import unitcreate from '../../public/screenshots/UnitCreatePage.png'
import unitdetails from '../../public/screenshots/UnitDetailsPage.png'
import unitindex from '../../public/screenshots/UnitIndexPage.png'
import unitupdate from '../../public/screenshots/UnitUpdatePage.png'

export default function CompanyHelp() {
  const styles = {
    header: 'font-bold text-3xl',
    sub_header: 'font-bold text-xl'
  }

  return (
    <div className='space-y-2'>
      <p>
        As a maintenance company, you will have access to view/edit/create buildings, building managers, units, technicians,
        maintenance tasks, and maintenance profiles.
      </p>

      <div>
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

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the building as displayed on the page.
            When you try to submit an empty input field, the page will display a red border and message near the input where
            you need to fill in the information.
          </p>
          <Image src={buildingcreate} alt='buildingCreatePage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a building will be similar to creating a building, except that the building
            information has been prefilled.
          </p>
          <Image src={buildingupdate} alt='buildingUpdatePage' />
        </div>
      </div>

      <div>
        <h2 className={styles.header}>Building Managers</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>

          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            
          </p>
        </div>
      </div>

      <div>
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

      <div>
        <h2 className={styles.header}>Technicians</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>

          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            
          </p>
        </div>
      </div>

      <div>
        <h2 className={styles.header}>Maintenance Tasks</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>

          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            
          </p>
        </div>
      </div>

      <div>
        <h2 className={styles.header}>Maintenance Profiles</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>

          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            
          </p>
        </div>
      </div>
    </div>
  )
}
