import React from 'react'
import Link from 'next/link'

export default function BuildingTable({data, labels, role}) {
    const styles = {
        header: "px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        body: "divide-y divide-gray-200",
        cell: "px-2 py-3 text-sm font-medium text-gray-900",
        link: "font-medium text-blue-600 hover:text-blue-500",
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
                    {role == 1 && <th></th>}
                </tr>
            </thead>
            <tbody className={styles.body}>
              {data.map((item, index) => (
                <tr key={index}>
                    <td className={styles.cell} id={`site_name-${item.id}`}>{item.site_name}</td>
                    <td className={styles.cell} id={`city-${item.id}`}>{item.city}</td>
                    <td>
                        <Link href={`/buildings/${item.id}`}>
                            <a className={styles.link}>More Info</a>
                        </Link>
                    </td>
                    {role == 1 && <td>
                        <Link href={`/buildings/edit/${item.id}`}>
                            <a className={styles.link}>Edit</a>
                        </Link>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </>
    )
}
