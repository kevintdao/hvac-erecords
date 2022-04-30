import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import TechnicianTable from '../../components/technicians/TechnicianTable'
import Link from 'next/link'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'

export default function Index(props) {
    const router = useRouter()
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/technicians`)
        .then((res) => {
            setData(res.data)
        })
        .catch(err => {
            const output = handleError(err)
            setError(output)
            return
          })
    }, [router])

    const labels = {
        text: ["Company", "First Name", "Last Name"],
        id: ["company", "first_name", "last_name"],
    };

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
        desc: "font-medium font-gray-900"
    }

    if (error) {
        return <div className='mt-2 font-bold text-lg' id='message'>{error}</div>
    }

    if (!data) {
        return (<Loading />)
    }

    return (
        <PrivateRoute isAllowed={[1]}>
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
        </PrivateRoute>
    )
}
