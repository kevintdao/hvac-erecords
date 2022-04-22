import React, { useState, useEffect } from 'react'
import { DownloadIcon } from '@heroicons/react/solid'
import { Temporal } from '@js-temporal/polyfill'
import RecordsNumeric from './RecordsNumeric'
import RecordsSelection from './RecordsSelection'
import RecordsText from './RecordsText'
import { CSVLink } from 'react-csv'

export default function UnitRecords ({ data, unitId }) {
  const [visits, setVisits] = useState()
  const [csvData, setCsvData] = useState()

  const styles = {
    visit_container: 'border border-gray-300 rounded p-2 space-y-2',
    grid_2: 'grid md:grid-cols-2 md:gap-0 gap-2 grid-cols-1',
    grid_3: 'grid md:grid-cols-3 md:gap-0 gap-2 grid-cols-1',
    grid_4: 'grid md:grid-cols-4 md:gap-0 gap-2 grid-cols-1',
    button: 'flex p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  const formatDate = (date) => {
    const offsetZone = Temporal.TimeZone.from(date);
    const correctParsedOffsetDateTime = Temporal.Instant.from(date).toZonedDateTimeISO(offsetZone).toLocaleString();
    return correctParsedOffsetDateTime
  }

  useEffect(() => {
    const formatData = () => {
      let output = []
      for (const [key, value] of Object.entries(data.visits)) {
        const planId = value.plan
        const techId = value.technician

        let tasks = []
        for (const [tKey, tValue] of Object.entries(data.task_completions)) {
          if(tValue.visit == key) {
            tasks.push(tValue)
          }
        }
        
        output.push({
          visit: value,
          technician: data.technicians[techId],
          plan: data.plans[planId],
          tasks: tasks
        })        
      }
      setVisits(output)
    }

    const formatCSV = () => {
      let output = []
      for (const [key, value] of Object.entries(data.visits)) {
        for (const [tKey, tValue] of Object.entries(data.task_completions)) {
          if(tValue.visit == key) {
            const planId = value.plan
            const techId = value.technician
            const rule = tValue.task_rule

            output.push({
              "Visit ID": value.id,
              "Unit Category": data.category,
              "Unit Serial Number": data.serial_number,
              "Unit Model Number": data.model_number,
              "Unit Manufacturer": data.manufacturer,
              "Unit Production Date": data.production_date,
              "Unit Installation Date": data.installation_date,
              "Building": `${data.building.site_name} (${data.building.street} ${data.building.city}, ${data.building.zip_code})`,
              "Technician": `${data.technicians[techId].first_name} ${data.technicians[techId].last_name}`,
              "Company": data.technicians[techId].affiliation,
              "License Number": data.technicians[techId].license_number,
              "Plan": data.plans[planId].profile_title,
              "Visit Start Time": formatDate(value.start_time),
              "Visit End Time": formatDate(value.end_time),
              "Task Title": tValue.task_title,
              "Task Description": tValue.task_description,
              "User Input": 
                rule.type == 'Numeric' ? tValue.value :
                rule.type == 'Selection' ? rule.options[tValue.selection] :
                rule.type == 'Text' ? tValue.response :
                ''
              })
          }
        }
      }
      setCsvData(output)
    }

    formatData()
    formatCSV()
  }, [data])

  if(!visits) {
    return <></>
  }

  return (
    <div className='space-y-2'>
      <div className='flex space-x-2'>
        <CSVLink className={styles.button} data={csvData} filename={`unit-${unitId}-records`}>
        <DownloadIcon className='h-5 w-5 mr-2' />
          CSV
        </CSVLink>

        <button className={styles.button}>
        <DownloadIcon className='h-5 w-5 mr-2' />
          PDF
        </button>
      </div>

      {visits.map((item, i) => (
        <div key={item.visit.id} className={styles.visit_container}>
          <div>
            <h3 className='font-bold text-2xl' id={`visit-${item.visit.id}`}>{`Visit ${item.visit.id}`}</h3>
            <div className={styles.grid_2}>
              <span id={`visit-${item.visit.id}-start`}><u>Start time:</u>{` ${formatDate(item.visit.start_time)}`}</span>
              <span id={`visit-${item.visit.id}-end`}><u>End time:</u>{` ${formatDate(item.visit.end_time)}`}</span>
            </div>
          </div>
          <hr />

          <div>
            <h5 className='font-bold text-xl'>{`Plan`}</h5>
            <div className='flex flex-col'>
              <span id={`plan-${item.visit.id}-title`}><u>Title:</u>{` ${item.plan.profile_title}`}</span>
              <span id={`plan-${item.visit.id}-desc`}><u>Description:</u>{` ${item.plan.profile_description}`}</span>
            </div>
          </div>
          <hr />

          <div>
            <h5 className='font-bold text-xl'>{`Technician`}</h5>
            <div className={styles.grid_2}>
              <span id={`tech-${item.visit.id}-fname`}><u>First name:</u>{` ${item.technician.first_name}`}</span>
              <span id={`tech-${item.visit.id}-lname`}><u>Last name:</u>{` ${item.technician.last_name}`}</span>
              <span id={`tech-${item.visit.id}-company`}><u>Affiliation:</u>{` ${item.technician.affiliation}`}</span>
              <span id={`tech-${item.visit.id}-license`}><u>License number:</u>{` ${item.technician.license_number}`}</span>
            </div>
          </div>
          <hr />

          <div>
            <h5 className='font-bold text-xl'>{`Tasks`}</h5>
            <div className={styles.grid_2}>
              {item.tasks.map(task => (
                <div key={task.id} className='flex flex-col'>
                  <span><u>Title:</u>{` ${task.task_title}`}</span>
                  <span><u>Description:</u>{` ${task.task_description}`}</span>
                  <div>
                    {task.task_rule.type == 'Text' ? <RecordsText data={task} /> :
                    task.task_rule.type == 'Selection' ? <RecordsSelection data={task} /> :
                    task.task_rule.type == 'Numeric' ? <RecordsNumeric data={task} /> :
                    ''
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
