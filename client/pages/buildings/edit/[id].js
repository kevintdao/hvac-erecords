import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import BuildingForm from '../../../components/buildings/BuildingForm'
import Alert from '../../../components/Alert';
import Loading from '../../../components/Loading'
import { handleError } from '../../../utils/errors'
import PrivateRoute from '../../../components/PrivateRoute'

export default function Edit() {
    const router = useRouter();
    const { id } = router.query;
    const [buildingID, setBuildingId] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [managers, setManagers] = useState()
    const [backendError, setBackendError] = useState()

    const styles = {
        button: "p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800"
    }

    useEffect(() => {
        if (!router.isReady) return
    
        const fetchData = async () => {
            const detail = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/buildings/${id}/`)
            .catch(err => {
              const output = handleError(err)
              setBackendError(output)
              return
            })

            if (!detail) {
                return
            }
        
            const managersDetail = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/managers`)
        
            setManagers(managersDetail.data)
            setData(detail.data)
        }
        fetchData()
    }, [id, router])
    
    const onSubmit = async (data) => {
        axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/buildings/${id}/`, data)
        .then(res => {
            setBuildingId(res.data.id);
        })
        .catch(error => {
            const output = handleError(error)
            setError(output)
        })
    }

    // successfully updated building
    if(buildingID){
        return (
            <div className='mt-2'>
                <Alert
                    title="Successful"
                    text="Successfully updated a building. Click the link below to the updated building or all the buildings"
                    type="success"
                />

                <div className='mt-4 space-x-4'>
                    <Link href="/buildings">
                        <a className={styles.button}>All buildings</a>
                    </Link>
                    <Link href={`/buildings/${id}`}>
                        <a className={styles.button}>See building info</a>    
                    </Link>
                </div>
            </div>
        )
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
                <title>Update Building</title>
            </Head>

            <h2 className="font-bold text-3xl">Update Building</h2>

            {error && <Alert title="Error" text={error} type="error" />}

            <BuildingForm type='Update' data={data} onSubmit={onSubmit} managers={managers} />
        </div>
        </PrivateRoute>
    )
}
