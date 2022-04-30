import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import BuildingDetails from '../../components/buildings/BuildingDetails'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'

export default function Building(props) {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState()
    const [backendError, setBackendError] = useState()

    useEffect(() => {
        if (!router.isReady) return
    
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/buildings/${id}/`)
          .then((res) => {
            setData(res.data)
          })
          .catch(err => {
            const output = handleError(err)
            setBackendError(output)
            return
          })
    }, [id, router])

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
    }

    if (backendError) {
        return <div className='mt-2 font-bold text-lg' id='message'>{backendError}</div>
    }

    if (!data) {
        return (<Loading />)
    }

    return (
        <PrivateRoute isAllowed={[1,2]}>
        <div className='space-y-4 mt-2'>
            <Head>
                <title>Building Details</title>
            </Head>

            <h2 className='font-bold text-3xl'>Building Details</h2>

            <BuildingDetails data={data}/>

            <div className='space-x-4'>
                <Link href="/buildings">
                    <a className={styles.button} id='all-buildings'>All Buildings</a>
                </Link>

                <Link href={`/buildings/edit/${id}`}>
                    <a className={styles.button} id='edit'>Edit</a>
                </Link>
            </div>
        </div>
        </PrivateRoute>
    )
}
