import React from 'react'
import Image from 'next/image'

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
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current building information. There's button for editing the current building
            or go back to the table of all the buildings.
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the building as displayed on the page.
            When you try to submit an empty input field, the page will display a red border and message near the input where
            you need to fill in the information.
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a building will be similar to creating a building, except that the building
            information has been prefilled.
          </p>
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
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current unit information. There's button for editing the current unit
            or go back to the table of all the units.
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the unit as displayed on the page.
            When you try to submit an empty input field, the page will display a red border and message near the input where
            you need to fill in the information.
          </p>
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a unit will be similar to creating a unit, except that the unit
            information has been prefilled.
          </p>
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
