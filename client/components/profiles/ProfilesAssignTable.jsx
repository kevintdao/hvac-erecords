import React from 'react'
import Link from 'next/link'

export default function ProfilesAssignTable ({ data, labels }) {
  const styles = {
    header: "px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "divide-y divide-gray-200",
    cell: "px-2 py-3 text-sm font-medium text-gray-900",
    link: "font-medium text-blue-600 hover:text-blue-500",
    checkbox_disable: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
  }

  return (
    <>
      <table className="divide-y divide-gray-200 min-w-full table-fixed">
        <thead className='bg-gray-50'>
          <tr>
            {labels.id.map((item, index) => (
              <th key={index} id={labels.id[index]} className={styles.header}>{labels.text[index]}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.plan.map((item, i) => (
            <tr key={i}>
              <td className={styles.cell} id={`title-${item.id}`}>{data.profile[i].title}</td>
              <td className={styles.cell} id={`is-required-${item.id}`}>
                <input className={styles.checkbox_disable} type='checkbox' name={`is-required-${item.id}`} id={`is-required-${item.id}`} checked={item.is_required} readOnly disabled />
              </td>
              <td className={styles.cell} id={`is-repeating-${item.id}`}>
                <input className={styles.checkbox_disable} type='checkbox' name={`is-repeating-${item.id}`} id={`is-repeating-${item.id}`} checked={item.is_repeating} readOnly disabled/>
              </td>
              <td className={styles.cell} id={`start-date-${item.id}`}>{item.start_date}</td>
              <td className={styles.cell} id={`end-date-${item.id}`}>{item.end_date}</td>
              <td>
                <Link href={`/plans/edit/${item.id}`}>
                  <a className={styles.link}>Edit</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
