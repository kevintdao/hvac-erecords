import React from 'react'
import Link from 'next/link';
import { Menu } from '@headlessui/react'

export default function UnitTable({ data, labels, role }) {
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
            <th></th>
            {role == 1 && <th></th>}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.map((item, index) => (
            <tr key={index}>
              <td className={styles.cell} id={`ex-id-${item.id}`}>{item.external_id}</td>
              <td className={styles.cell} id={`model-${item.id}`}>{item.model_number}</td>
              <td className={styles.cell} id={`serial-${item.id}`}>{item.serial_number}</td>
              <td className={styles.cell} id={`category-${item.id}`}>{item.category}</td>
              <td className={styles.cell} id={`manufacturer-${item.id}`}>{item.manufacturer}</td>
              <td>
                <Menu>
                  <Menu.Button id={`reports-${item.id}`} className='inline-flex w-full rounded-md font-medium text-blue-600 hover:text-blue-500'>Reports</Menu.Button>
                  <Menu.Items className='flex flex-col absolute mt-2 origin-top-right divide-y divide-gray-100 border border-gray-100 rounded p-2 bg-white'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={`/units/records/${item.id}`}>
                          <a className={styles.link}>Records</a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={`/units/refrigerant/${item.id}`}>
                          <a className={styles.link}>Refrigerant Leaks</a>
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </td>
              <td>
                <Link href={`/units/${item.id}`}>
                  <a className={styles.link}>More Info</a>
                </Link>
              </td>
              {role == 1 && <td>
                <Link href={`/units/edit/${item.id}`}>
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
