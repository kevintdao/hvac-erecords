import React from 'react'
import { useRouter } from 'next/router'
import { Temporal } from '@js-temporal/polyfill'
import { setObject } from '../../utils/local_storage'

export default function OtherPlans ({ unitId, data, labels }) {
  const router = useRouter()
  const styles = {
    table: "divide-y divide-gray-200 min-w-full table-fixed",
    header: "px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "divide-y divide-gray-200",
    cell: "px-2 py-3 text-sm font-medium text-gray-900",
    link: "font-medium text-blue-600 hover:text-blue-500",
    checkbox_disable: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
  }

  return (
    <>
      <table className={styles.table}>
        <thead className='bg-gray-50'>
          <tr>
            {labels.id.map((item, index) => (
              <th key={index} id={labels.id[index]} className={styles.header}>{labels.text[index]}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.body}>
            {data.map((item, index) => (
              <tr key={index}>
                <td className={`${styles.cell} w-1/4`} id={`title-${item.id}`}>{item.profile.title}</td>
                <td className={`${styles.cell} w-1/8`} id={`is-repeating-${item.id}`}>
                  <input className={styles.checkbox_disable} type='checkbox' name={`is-repeating-${item.id}`} id={`is-repeating-${item.id}`} checked={item.is_repeating} readOnly disabled/>
                </td>
                <td className={`${styles.cell} w-1/4`} id={`start-date-${item.id}`}>{item.is_required ? item.start_date : '-'}</td>
                <td className={`${styles.cell} w-1/4`} id={`end-date-${item.id}`}>{item.is_required ? item.end_date : '-'}</td>
                <td>
                  <button id={item.id} className={`${styles.link} w-1/8`} onClick={() => {
                    setObject(`/service-visits/${item.id}`, { start_time: Temporal.Now.instant().round('second').toString()})
                    router.push({
                        pathname: `/service-visits/${item.id}`,
                        query: { unit: unitId }
                      }, `/service-visits/${item.id}`)
                }}>Complete</button>
              </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
