import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import TechnicianDetails from '../../components/technicians/TechnicianDetails';
import Loading from '../../components/Loading'

export default function Technician({data}) {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState()

    useEffect(() => {
        if (!router.isReady) return
    
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/technicians/${id}/`)
          .then((res) => {
            setData(res.data)
          })
    }, [router.isReady])

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
    }

    if (!data) {
        return (<Loading />)
    }

    return (
        <div className='space-y-4 mt-2'>
            <Head>
                <title>Technician Details</title>
            </Head>

            <h2 className='font-bold text-3xl'>Technician Details</h2>

            <TechnicianDetails data={data}/>

            <div className='space-x-4'>
                <Link href="/technicians">
                    <a className={styles.button}>All Technicians</a>
                </Link>

                <Link href={`/technicians/edit/${id}`}>
                    <a className={styles.button}>Edit</a>
                </Link>
            </div>
        </div>
    )
}
