import React, { useState, useEffect } from 'react'
import { DownloadIcon } from '@heroicons/react/solid'
import { Temporal } from '@js-temporal/polyfill'
import { CSVLink } from 'react-csv'
import { PDFDownloadLink } from '@react-pdf/renderer'

export default function UnitRefrigerants ({ data, unitId }) {
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

  }, [])

  console.log(data)

  return (
    <div className='space-y-2'>
      {!data &&  <div className='flex space-x-2'>
        No records
      </div>}

      {data && <div className={styles.visit_container}>
        <h3 className='font-bold text-2xl' id={data.id}>{`Refrigerant Leaks Report`}</h3>
        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Main Information`}</h5>
          <span id='serial_number'><u>Serial Number:</u> {data.serial_number}</span>
          <span id='operator'><u>Operator:</u> {data.operator}</span>
          <span id='address'><u>Address:</u> {`${data.street}, ${data.city} ${data.zip_code}`}</span>
        </div>
        <hr />

        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Full Charge`}</h5>
          {data.full_charge.map((item, i) => (
            <div className='flex flex-col mb-4'>
              <span id={`date-${i}`}><u>Date of revision:</u> {`${formatDate(item.time)}`}</span>
              <span id={`amount-${i}`}><u>Amount:</u> {item.value}</span>
              <span id={`method-${i}`}><u>Method of calculating full charge:</u> {item.method}</span>
            </div>
          ))}
        </div>
        <hr />

        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Servicing History`}</h5>
          <span id='serial_number'><u>Serial Number:</u> {data.serial_number}</span>
          <span id='operator'><u>Operator:</u> {data.operator}</span>
          <span id='address'><u>Address:</u> {`${data.street}, ${data.city} ${data.zip_code}`}</span>
        </div>
        <hr />

        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Leak Inspection History`}</h5>
          <span id='serial_number'><u>Serial Number:</u> {data.serial_number}</span>
          <span id='operator'><u>Operator:</u> {data.operator}</span>
          <span id='address'><u>Address:</u> {`${data.street}, ${data.city} ${data.zip_code}`}</span>
        </div>
        <hr />

        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Verfication History`}</h5>
          <span id='serial_number'><u>Serial Number:</u> {data.serial_number}</span>
          <span id='operator'><u>Operator:</u> {data.operator}</span>
          <span id='address'><u>Address:</u> {`${data.street}, ${data.city} ${data.zip_code}`}</span>
        </div>
        
      </div>}
    </div>
  )
}
