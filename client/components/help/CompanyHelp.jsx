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
import managercreate from '../../public/screenshots/ManagerCreatePage.png'
import managerdetails from '../../public/screenshots/ManagerDetailsPage.png'
import managerindex from '../../public/screenshots/ManagerIndexPage.png'
import managerupdate from '../../public/screenshots/ManagerUpdatePage.png'
import techniciancreate from '../../public/screenshots/TechnicianCreatePage.png'
import techniciandetails from '../../public/screenshots/TechnicianDetailsPage.png'
import technicianindex from '../../public/screenshots/TechnicianIndexPage.png'
import technicianupdate from '../../public/screenshots/TechnicianUpdatePage.png'
import profilecreate from '../../public/screenshots/ProfileCreatePage.png'
import profiledetails from '../../public/screenshots/ProfileDetailsPage.png'
import profileindex from '../../public/screenshots/ProfileIndexPage.png'
import profileupdate from '../../public/screenshots/ProfileUpdatePage.png'
import taskcreate from '../../public/screenshots/TaskCreatePage.png'
import taskdetails from '../../public/screenshots/TaskDetailsPage.png'
import taskindex from '../../public/screenshots/TaskIndexPage.png'
import taskupdate from '../../public/screenshots/TaskUpdatePage.png'

export default function CompanyHelp() {
  const styles = {
    header: 'font-bold text-3xl text-center',
    sub_header: 'font-bold text-xl',
    container: 'space-y-2 p-2 border border-gray-200 rounded'
  }

  return (
    <div className='space-y-2'>
      <p>
        As a maintenance company, you will have access to view/edit/create buildings, building managers, units, technicians,
        maintenance tasks, and maintenance profiles.
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

      <hr />

      <div className={styles.container}>
        <h2 className={styles.header}>Building Managers</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>
            On this page, you can see a table of all the buidling managers and a short details for each them. 
            For each building manager on this page, you can view details on a specific building manager by clicking on the &quot;More Info&quot;
            button or edit a building manager by clicking on the &quot;Edit&quot; button.
          </p>
          <Image src={managerindex} alt='managerIndexPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current building manager information. There&apos;s button for editing the current building manager
            or go back to the table of all the building managers.
          </p>
          <Image src={managerdetails} alt='managerDetailsPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the building manager as displayed on the page.
            When you try to submit an empty input field, the page will display a red border and message near the input where
            you need to fill in the information.
          </p>
          <Image src={managercreate} alt='managerCreatePage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a unit will be similar to creating a building manager, except that the unit
            information has been prefilled.
          </p>
          place holder image, replace with page is finished
          <Image src={managerupdate} alt='managerUpdatePage' />
        </div>
      </div>

      <hr />

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

      <hr />

      <div className={styles.container}>
        <h2 className={styles.header}>Technicians</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>
            On this page, you can see a table of all the technicians and a short details for each them. 
            For each technician on this page, you can view details on a specific technician by clicking on the &quot;More Info&quot;
            button or edit a technician by clicking on the &quot;Edit&quot; button.
          </p>
          <Image src={technicianindex} alt='technicianIndexPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current technician information. There&apos;s button for editing the current technician
            or go back to the table of all the technicians.
          </p>
          <Image src={techniciandetails} alt='technicianDetailsPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the technician as displayed on the page.
            When you try to submit an empty input field, the page will display a red border and message near the input where
            you need to fill in the information.
          </p>
          <Image src={techniciancreate} alt='technicianCreatePage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a unit will be similar to creating a technician, except that the unit
            information has been prefilled.
          </p>
          place holder image, replace with page is finished
          <Image src={technicianupdate} alt='technicianUpdatePage' />
        </div>
      </div>

      <hr />

      <div className={styles.container}>
        <h2 className={styles.header}>Maintenance Tasks</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>
            On this page, you can see a table of all the maintenance tasks and a short details for each them. 
            For each task on this page, you can view details on a specific task by clicking on the &quot;More Info&quot;
            button or edit a unit by clicking on the &quot;Edit&quot; button.
          </p>
          <Image src={taskindex} alt='taskIndexPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current task information. There&apos;s button for editing the current task
            or go back to the table of all the tasks.
          </p>
          <Image src={taskdetails} alt='taskDetailsPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the maintenance task as displayed on the page.
            There are three types of task avaiable in the type dropdown menu. <br />
          </p>
          <ul className='list-disc ml-6'>
            <li>
              The Numeric type will display two optional parameters, the minimum and maximum value for the numeric input. 
              This will display a numeric input when creating a profile.
            </li>
            <li>
              The Selection type will display inputs for the options. The minimum number of choices is 2 and max is 10. 
              This will display a multiple choices radio buttons when creating a profile.
            </li>
            <li>
              The Text type will display inputs for the options. The minimum number of choices is 2 and max is 10. 
              This will display a textarea input when creating a profile.
            </li>
          </ul>
          <p>
            When you try to submit an empty input field, the page will display a red border and message near the input where
            you need to fill in the information.
          </p>
          <Image src={taskcreate} alt='taskCreatePage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a task will be similar to creating a task, except that the task
            information has been prefilled.
          </p>
          <Image src={taskupdate} alt='taskUpdatePage' />
        </div>
      </div>

      <hr />

      <div className={styles.container}>
        <h2 className={styles.header}>Maintenance Profiles</h2>
        <div>
          <h4 className={styles.sub_header}>Index</h4>
          <p>
            On this page, you can see a table of all the maintenance profiles and a short details for each them. 
            For each profile on this page, you can view details on a specific profile by clicking on the &quot;More Info&quot;
            button or edit a unit by clicking on the &quot;Edit&quot; button.
          </p>
          <Image src={profileindex} alt='profileIndexPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Details</h4>
          <p>
            On this page, you can see the current profile information. There&apos;s button for editing the current profile
            or go back to the table of all the profiles.
          </p>
          <Image src={profiledetails} alt='profileDetailsPage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Create</h4>
          <p>
            On this page, you will need to fill in all the required information for the maintenance profile as displayed on the page.
            You can add more tasks by click on the &quot;Add Task&quot; button. <br />
            Each profile require at least 1 task and you can delete exisiting tasks by pressing the &quot;Delete&quot; button,
            which will show up for all tasks when there is more than 1 task.
          </p>
          <Image src={profilecreate} alt='profileCreatePage' />
        </div>

        <div>
          <h4 className={styles.sub_header}>Edit</h4>
          <p>
            On this page, the process of editing a profile will be similar to creating a profile, except that the profile
            information has been prefilled.
          </p>
          <Image src={profileupdate} alt='profileUpdatePage' />
        </div>
      </div>
    </div>
  )
}
