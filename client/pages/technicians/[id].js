import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import TechnicianDetails from '../../components/technicians/TechnicianDetails';
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'

export default function Technician(props) {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        if (!router.isReady) return
    
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/technicians/${id}/`)
          .then((res) => {
            setData(res.data)
          })
          .catch(err => {
            const output = handleError(err)
            setError(output)
            return
          })
    }, [id, router])

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
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
                <title>Technician Details</title>
            </Head>

            <h2 className='font-bold text-3xl'>Technician Details</h2>

            <TechnicianDetails data={data}/>

            <div className='space-x-4'>
                <Link href="/technicians">
                    <a className={styles.button} id='all-technicians'>All Technicians</a>
                </Link>

                <Link href={`/technicians/edit/${id}`}>
                    <a className={styles.button} id='edit'>Edit</a>
                </Link>
            </div>
        </div>
        </PrivateRoute>
    )
}
