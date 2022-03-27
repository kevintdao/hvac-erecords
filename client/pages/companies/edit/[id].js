import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import CompanyForm from '../../../components/companies/CompanyForm'
import Alert from '../../../components/Alert'
import Loading from '../../../components/Loading'

export default function Edit (props) {
    const router = useRouter()
    const { id } = router.query
    const [companyId, setCompanyId] = useState()
    const [error, setError] = useState()
    const [data, setData] = useState()

    const styles = {
        button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
    }

    useEffect(() => {
        if (!router.isReady) return

        axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/companies/${id}/`)
        .then((res) => {
            setData(res.data)
        })
    }, [id, router.isReady])

    const onSubmit = async (data) => {
        axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/companies/${id}/`, data)
        .then(res => {
            setCompanyId(res.data.id)
        })
        .catch(() => {
            setError('Error with request')
        })
    }

    // successfully updated company
    if (companyId) {
        return (
        <div className='mt-2'>
            <Alert
            title='Successful'
            text='Successfully updated a company. Click the link below to the updated company or all the companies'
            type='success'
            />

            <div className='mt-4 space-x-4'>
            <Link href='/companies'>
                <a className={styles.button}>All Companies</a>
            </Link>
            <Link href={`/companies/${id}`}>
                <a className={styles.button}>See Company Info</a>
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
            <title>Update Company</title>
        </Head>

        <h2 className='font-bold text-3xl'>Update Company</h2>

        {error && <Alert title='Error' text={error} type='error' />}

        <CompanyForm type='Update' data={data} onSubmit={onSubmit} />
        </div>
    )
}
