import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import CompanyDetails from '../../components/companies/CompanyDetails'
import Loading from '../../components/Loading'

export default function Company (props) {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState()

    useEffect(() => {
        if (!router.isReady) return

        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/companies/${id}/`)
        .then((res) => {
            setData(res.data)
        })
    }, [id, router.isReady])

    const styles = {
        button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
    }

    if (!data) {
        return (<Loading />)
    }

    return (
        <div className='space-y-4 mt-2'>
            <Head>
                <title>Company Details</title>
            </Head>

            <h2 className='font-bold text-3xl'>Company Details</h2>

            <CompanyDetails data={data} />

            <div className='space-x-4'>
                <Link href='/companies'>
                    <a className={styles.button} id='all-companies'>All Companies</a>
                </Link>

                <Link href={`/companies/edit/${id}`}>
                    <a className={styles.button} id='edit'>Edit</a>
                </Link>
            </div>
        </div>
    )
}
