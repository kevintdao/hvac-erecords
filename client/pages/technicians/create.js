import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import TechnicianForm from '../../components/technicians/TechnicianForm';
import Alert from '../../components/Alert'
import { handleError } from '../../utils/errors';
import PrivateRoute from '../../components/PrivateRoute';

export default function Create() {
    const [id, setId] = useState(null);
    const [error, setError] = useState();

    const styles = {
        button: "p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800"
    }

    const onSubmit = async (data) => {
        data.user = {"email": data.email}
        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/technicians`, data)
        .then(res => {
            console.log(res.data)
            setId(res.data.user.id);
        })
        .catch(error => {
            const output = handleError(error)
            setError(output)
        })
    }

    // successfully created technician
    if(id){
        return (
        <div className='mt-2'>
            <Alert 
            title="Successful"
            text="Successfully created a technician. Click the link below to view the newly created technician or all the technicians"
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
        <PrivateRoute isAllowed={[1]}>
        <div className='space-y-4 mt-2'>
            <Head>
            <title>Create Technician</title>
            </Head>

            <h2 className="font-bold text-3xl">Create Technician</h2>

            {error && <Alert title="Error" text={error} type="error" />}

            <TechnicianForm type='Create' onSubmit={onSubmit}/>
        </div>
        </PrivateRoute>
    )
}
