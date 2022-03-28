import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import TechnicianForm from '../../../components/technicians/TechnicianForm'
import Alert from '../../../components/Alert';
import Loading from '../../../components/Loading'

export default function Edit(props) {
    const router = useRouter();
    const { id } = router.query;
    const [technicianId, setTechnicianId] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState()

    const styles = {
        button: "p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800"
    }

    useEffect(() => {
        if (!router.isReady) return
    
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/technicians/${id}/`)
          .then((res) => {
            setData(res.data)
          })
    }, [id, router.isReady])
    
    const onSubmit = async (data) => {
        axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/technicians/${id}/`, data)
        .then(res => {
            setTechnicianId(res.data.id);
        })
        .catch(error => {
            setError("Error with request");
        })
    }

    // successfully updated technician
    if(technicianId){
        return (
            <div className='mt-2'>
                <Alert 
                    title="Successful"
                    text="Successfully updated a technician. Click the link below to the updated technician or all the technicians"
                    type="success"
                />

                <div className='mt-4 space-x-4'>
                    <Link href="/technicians">
                        <a className={styles.button}>All technicians</a>        
                    </Link>
                    <Link href={`/technicians/${id}`}>
                        <a className={styles.button}>See technician info</a>        
                    </Link>
                </div>
            </div>
        )
    }

    if (!data) {
        return (<Loading />)
    }

    return (
        <div className='space-y-4 mt-2'>
            <Head>
                <title>Update Technician</title>
            </Head>

            <h2 className="font-bold text-3xl">Update Technician</h2>

            {error && <Alert title="Error" text={error} type="error" />}

            <TechnicianForm type='Update' data={data} onSubmit={onSubmit}/>
        </div>
    )
}
