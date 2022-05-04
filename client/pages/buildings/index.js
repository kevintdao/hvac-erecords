import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import BuildingTable from '../../components/buildings/BuildingTable'
import Link from 'next/link'
import Loading from '../../components/Loading'
import PrivateRoute from '../../components/PrivateRoute'
import { handleError } from '../../utils/errors'
import { useAppContext } from '../../context/state'

export default function Index() {
    const router = useRouter()
    const [data, setData] = useState()
    const [backendError, setBackendError] = useState()
    const { user } = useAppContext()
    const role = user.user?.role
    const isCompany = role == 1

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/buildings`)
        .then((res) => {
            setData(res.data)
        })
        .catch(err => {
            const output = handleError(err)
            setBackendError(output)
            return
          })
    }, [router])

    const labels = {
        text: ["Site Name", "City"],
        id: ["site_name", "city"],
    };

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
        desc: "font-medium font-gray-900"
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
            <title>Buildings</title>
            </Head>

            <h2 className='font-bold text-3xl'>Buildings</h2>

            {data.length == 0 ? <p className={styles.desc}>No existing buildings</p> : <BuildingTable data={data} labels={labels} role={role} />}

            {isCompany && <div className='mt-2'>
                <Link href="/buildings/create">
                    <a className={styles.button}>New Building</a>
                </Link>
            </div>}
        </div>
        </PrivateRoute>
    )
}
