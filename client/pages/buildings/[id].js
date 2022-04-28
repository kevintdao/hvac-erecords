import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import BuildingDetails from '../../components/buildings/BuildingDetails'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'

export default function Building(props) {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState()

    useEffect(() => {
        if (!router.isReady) return
    
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/buildings/${id}/`)
          .then((res) => {
            setData(res.data)
          })
          .catch(err => {
            router.push({
              pathname: '/login',
              query: { error: 'You must be logged in to access this page' }
            }, '/login')
            return
          })
    }, [id, router])

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
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
