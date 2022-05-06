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
    grid_2: 'grid md:grid-cols-2 md:gap-4 gap-2 grid-cols-1',
    grid_3: 'grid md:grid-cols-3 md:gap-4 gap-2 grid-cols-1',
    grid_4: 'grid md:grid-cols-4 md:gap-4 gap-2 grid-cols-1',
    button: 'flex p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  const formatDate = (date) => {
    const offsetZone = Temporal.TimeZone.from(date);
    const correctParsedOffsetDateTime = Temporal.Instant.from(date).toZonedDateTimeISO(offsetZone).toLocaleString();
    return correctParsedOffsetDateTime
  }

  useEffect(() => {

  }, [])

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
            <div key={`charge-${i}`} className='flex flex-col mb-4'>
              <span id={`charge-date-${i}`}><u>Date of revision:</u> {`${formatDate(item.time)}`}</span>
              <span id={`charge-amount-${i}`}><u>Amount:</u> {item.value}</span>
              <span id={`charge-method-${i}`}><u>Method of calculating full charge:</u> {item.method}</span>
            </div>
          ))}
          <hr />
        </div>

        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Servicing History`}</h5>
          {data.servicing.map((item, i) => (
            <div key={`servicing-${i}`} className='flex flex-col mb-4'>
              <span id={`servicing-date-${i}`}><u>Date of service:</u> {`${formatDate(item.time)}`}</span>
              <span id={`servicing-technician-${i}`}><u>Technician:</u> {item.technician}</span>
              <span id={`servicing-part-${i}`}><u>Parts being serviced:</u> {item.parts}</span>
              <span id={`servicing-change-${i}`}><u>Refrigerant Change:</u> {item.change}</span>
              <span id={`servicing-amount-${i}`}><u>Refrigerant Amount:</u> {item.amount}</span>
              <span id={`servicing-type-${i}`}><u>Refrigerant Type:</u> {item.refrigerant_type}</span>
              <span id={`servicing-rate-${i}`}><u>Leak rate:</u> {item.leak_rate}</span>
              <span id={`servicing-method-${i}`}><u>Leak rate method:</u> {item.method}</span>
            </div>
          ))}
          <hr />
        </div>

        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Leak Inspection History`}</h5>
          {data.inspections.map((item, i) => (
            <div key={`inspection-${i}`} className='flex flex-col mb-4'>
              <span id={`inspection-date-${i}`}><u>Date of inspection:</u> {`${formatDate(item.time)}`}</span>
              <span id={`inspection-method-${i}`}><u>Inspection method:</u> {item.method}</span>
              <span id={`inspection-location-${i}`}><u>Location of leaks:</u> {item.location}</span>
            </div>
          ))}
          <hr />
        </div>

        <div className='flex flex-col'>
          <h5 className='font-bold text-xl'>{`Verfication History`}</h5>
          {data.verification.map((item, i) => (
            <div key={`verification-${i}`} className='flex flex-col mb-4'>
              <span id={`verification-date-${i}`}><u>Date of inspection:</u> {`${formatDate(item.time)}`}</span>
              <span id={`verification-location-${i}`}><u>Location of leaks tested:</u> {item.location}</span>
              <span id={`verification-test-${i}`}><u>Types of verification tests:</u> {item.test}</span>
              <span id={`verification-result-${i}`}><u>Test Results:</u> {item.result}</span>
            </div>
          ))}
          <hr />
        </div>
        
      </div>}
    </div>
  )
}
