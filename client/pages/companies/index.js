import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import CompanyTable from '../../components/companies/CompanyTable'
import Loading from '../../components/Loading'

export default function Index (props) {
    const [data, setData] = useState()
  
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/companies`)
            .then((res) => {
                setData(res.data)
            })
    }, [])

    const labels = {
        text: ['Company Name', 'City', 'Zip Code'],
        id: ['name', 'city', 'zip_code']
    }

    const styles = {
        button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
        desc: 'font-medium font-gray-900'
    }
    
    if (!data) {
        return (<Loading />)
    }

    return (
        <div className='space-y-4 mt-2'>
            <Head>
                <title>Companies</title>
            </Head>

            <h2 className='font-bold text-3xl'>Companies</h2>

            {data.length === 0 ? <p className={styles.desc} id='no-companies'>No existing companies</p> : <CompanyTable data={data} labels={labels} />}

            <div className='mt-2'>
                <Link href='/companies/create'>
                    <a className={styles.button}>New Company</a>
                </Link>
            </div>
        </div>
    )
}
