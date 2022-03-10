import React from 'react'
import Link from 'next/link';

export default function UnitsTable({ data, labels }) {
  const styles = {
    header: "px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "divide-y divide-gray-200",
    cell: "px-2 py-3 text-sm font-medium text-gray-900",
    link: "",
  }
  
  return (
    <>
      <table className="divide-y divide-gray-200 min-w-full table-fixed">
        <thead className='bg-gray-50'>
          <tr>
            {labels.map((item, index) => (
              <th key={index} id={item} className={styles.header}>{item}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.map((item, index) => (
            <tr key={index}>
              <td className={styles.cell}>{item.external_id}</td>
              <td className={styles.cell}>{item.model_number}</td>
              <td className={styles.cell}>{item.serial_number}</td>
              <td className={styles.cell}>{item.category}</td>
              <td className={styles.cell}>{item.manufacturer}</td>
              <td>
                <Link href={`/units/${item.id}`}>
                  <a>More Info</a>
                </Link>
              </td>
              <td>
                <Link href={`/units/edit/${item.id}`}>
                  <a>Edit</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
