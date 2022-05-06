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
      
    </div>
  )
}
