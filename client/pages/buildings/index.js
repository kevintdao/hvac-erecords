import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import BuildingTable from '../../components/buildings/BuildingTable'
import Link from 'next/link'
import Loading from '../../components/Loading'

export default function Index(props) {
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/buildings`)
        .then((res) => {
            setData(res.data)
        })
    }, [])

    const labels = {
        text: ["Owner ID", "Site Name", "City"],
        id: ["owner_id", "site_name", "city"],
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
            <title>Buildings</title>
            </Head>

            <h2 className='font-bold text-3xl'>Buildings</h2>

            {data.length == 0 ? <p className={styles.desc}>No existing buildings</p> : <BuildingTable data={data} labels={labels} />}

            <div className='mt-2'>
                <Link href="/buildings/create">
                    <a className={styles.button}>New Building</a>
                </Link>
            </div>
        </div>
    )
}
