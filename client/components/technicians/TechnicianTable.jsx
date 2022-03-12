import React from 'react'
import Link from 'next/link'

export default function TechnicianTable({data, labels}) {
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
                </tr>
            </thead>
            <tbody className={styles.body}>
              {data.map((item, index) => (
                <tr key={index}>
                    <td className={styles.cell} id={`ex-id-${item.id}`}>{item.user_id}</td>
                    <td className={styles.cell} id={`model-${item.id}`}>{item.company_id}</td>
                    <td className={styles.cell} id={`serial-${item.id}`}>{item.first_name}</td>
                    <td className={styles.cell} id={`category-${item.id}`}>{item.last_name}</td>
                    <td>
                        <Link href={`/units/${item.id}`}>
                            <a className={styles.link}>More Info</a>
                        </Link>
                    </td>
                    </tr>
              ))}
            </tbody>
          </table>
        </>
    )
}
