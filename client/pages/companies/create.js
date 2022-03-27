import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import CompanyForm from '../../components/companies/CompanyForm'
import Alert from '../../components/Alert'

export default function Create () {
    const [id, setId] = useState(null)
    const [error, setError] = useState()

    const styles = {
        button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
    }

    const onSubmit = async (data) => {
        data.company = 1
        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/companies`, data)
        .then(res => {
            setId(res.data.id)
        })
        .catch(() => {
            setError('Error with request')
        })
    }

    // successfully created company
    if (id) {
        return (
            <div className='mt-2'>
                <Alert
                    title='Successful'
                    text='Successfully created a company. Click the link below to the newly created company or all the companies'
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

    return (
        <div className='space-y-4 mt-2'>
            <Head>
                <title>Create Company</title>
            </Head>

            <h2 className='font-bold text-3xl'>Create Company</h2>

            {error && <Alert title='Error' text={error} type='error' />}

            <CompanyForm type='Create' onSubmit={onSubmit} />
        </div>
    )
}
