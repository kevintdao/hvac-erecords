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
    visit_container: 'border border-gray-300 rounded p-2',
    grid_2: 'grid md:grid-cols-2 gap-2 grid-cols-1',
    grid_3: 'grid md:grid-cols-3 gap-2 grid-cols-1',
    grid_4: 'grid md:grid-cols-4 gap-2 grid-cols-1',
    button: 'flex p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
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
              "Technician": `${data.technicians[techId].first_name} ${data.technicians[techId].last_name}`,
              "Company": data.technicians[techId].affiliation,
              "License Number": data.technicians[techId].license_number,
              "Plan": data.plans[planId].profile_title,
              "Visit Start Time": value.start_time,
              "Visit End Time": value.end_time,
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
  }, [])

  if(!visits) {
    return <></>
  }

  const formatDate = (date) => {
    const offsetZone = Temporal.TimeZone.from(date);
    const correctParsedOffsetDateTime = Temporal.Instant.from(date).toZonedDateTimeISO(offsetZone);
    return correctParsedOffsetDateTime
  }

  console.log(csvData)

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
          <h5>{`Visit ${item.visit.id}`}</h5>
          <div className={styles.grid_2}>
            <span>{`Start time: ${item.visit.start_time}`}</span>
            <span>{`End time: ${item.visit.end_time}`}</span>
          </div>
          
          <h5>{`Plan`}</h5>
          <div className='flex flex-col'>
            <span>{`Title: ${item.plan.profile_title}`}</span>
            <span>{`Description: ${item.plan.profile_description}`}</span>
          </div>

          <h5>{`Technician`}</h5>
          <div className={styles.grid_2}>
            <span>{`First name: ${item.technician.first_name}`}</span>
            <span>{`Last name: ${item.technician.last_name}`}</span>
            <span>{`Affiliation: ${item.technician.affiliation}`}</span>
            <span>{`License number: ${item.technician.license_number}`}</span>
          </div>

          <h5>{`Tasks`}</h5>
          <div className={styles.grid_2}>
            {item.tasks.map(task => (
              <div key={task.id} className='flex flex-col'>
                <span>{`Title: ${task.task_title}`}</span>
                <span>{`Description: ${task.task_description}`}</span>
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
      ))}
    </div>
  )
}
