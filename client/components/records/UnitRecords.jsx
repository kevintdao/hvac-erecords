import React, { useState, useEffect } from 'react'
import { DownloadIcon } from '@heroicons/react/solid'
import { Temporal } from '@js-temporal/polyfill'

export default function UnitRecords ({ data }) {
  const [visits, setVisits] = useState()
  const styles = {
    visit_container: 'border border-gray-300 rounded',
    grid_2: 'grid md:grid-cols-2 gap-4 grid-cols-1',
    grid_3: 'grid md:grid-cols-3 gap-4 grid-cols-1',
    grid_4: 'grid md:grid-cols-4 gap-4 grid-cols-1',
    button: 'flex p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  useEffect(() => {
    const formatData = () => {
      let output = []
      for (const [key, value] of Object.entries(data.visits)) {
        const planId = value.plan
        const techId = value.technician
        output.push({
          visit: value,
          technician: data.technicians[techId],
          plan: data.plans[planId]
        })        
      }
      setVisits(output)
    }
    formatData()
  }, [])

  if(!visits) {
    return <></>
  }

  const formatDate = (date) => {
    const offsetZone = Temporal.TimeZone.from(date);
    const correctParsedOffsetDateTime = Temporal.Instant.from(date).toZonedDateTimeISO(offsetZone);
    return correctParsedOffsetDateTime
  }

  console.log(data)

  return (
    <div className='space-y-2'>
      <div className='flex space-x-2'>
        <button className={styles.button}>
        <DownloadIcon className='h-5 w-5 mr-2' />
          CSV
        </button>

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

          <h5>{`Technician`}</h5>
          <div className={styles.grid_4}>
            <span>{`First name: ${item.technician.first_name}`}</span>
            <span>{`Last name: ${item.technician.last_name}`}</span>
            <span>{`Affiliation: ${item.technician.affiliation}`}</span>
            <span>{`License number: ${item.technician.license_number}`}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
