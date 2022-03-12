import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import TechnicianForm from '../../../components/technicians/TechnicianForm'
import Alert from '../../../components/Alert';

export default function Edit({data}) {
    const router = useRouter();
    const { id } = router.query;
    const [technicianId, setTechnicianId] = useState();
    const [error, setError] = useState();

    const styles = {
        button: "p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800"
    }
    
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

// get technician data before loading the page
export async function getServerSideProps(context){
    const { id } = context.query;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/technicians/${id}/`);

    return {
        props: {
        data: res.data
        }
    }
}
