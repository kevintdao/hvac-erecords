import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import TechnicianTable from '../../components/technicians/TechnicianTable'
import Link from 'next/link'
import Loading from '../../components/Loading'

export default function Index(props) {
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/technicians`)
        .then((res) => {
            setData(res.data)
        })
    }, [])

    const labels = {
        text: ["Company", "First Name", "Last Name"],
        id: ["company", "first_name", "last_name"],
    };

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
        desc: "font-medium font-gray-900"
    }

    if (!data) {
        return (<Loading />)
    }

    return (
        <div className='space-y-4 mt-2'>
            <Head>
            <title>Technicians</title>
            </Head>

            <h2 className='font-bold text-3xl'>Technicians</h2>

            {data.length == 0 ? <p className={styles.desc}>No existing technicians</p> : <TechnicianTable data={data} labels={labels} />}

            <div className='mt-2'>
                <Link href="/technicians/create">
                    <a className={styles.button}>New Technician</a>
                </Link>
            </div>
        </div>
    )
}
