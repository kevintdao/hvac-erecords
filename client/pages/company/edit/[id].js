import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import CompanyUserForm from '../../../components/company-users/CompanyUserForm'
import Alert from '../../../components/Alert'
import Loading from '../../../components/Loading'
import { handleError } from '../../../utils/errors'
import PrivateRoute from '../../../components/PrivateRoute'

export default function Edit (props) {
    const router = useRouter()
    const { id } = router.query
    const [companyUserId, setCompanyUserId] = useState()
    const [error, setError] = useState()
    const [data, setData] = useState()
    const [backendError, setBackendError] = useState()

    const styles = {
        button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
    }

    useEffect(() => {
    if (!router.isReady) return

    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/company-users/${id}/`)
        .then((res) => {
        setData(res.data)
        })
        .catch(err => {
        const output = handleError(err)
        setBackendError(output)
        return
        })
    }, [id, router])

    const onSubmit = async (data) => {
    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/company-users/${id}/`, data)
        .then(res => {
        setCompanyUserId(res.data.id)
        })
        .catch(() => {
        const output = handleError(error)
        setError(output)
        })
    }

    // successfully updated company user
    if (companyUserId) {
    return (
        <div className='mt-2'>
            <Alert
                title='Successful'
                text='Successfully updated a company user. Click the link below to the updated company user or all the company users'
                type='success'
            />

            <div className='mt-4 space-x-4'>
                <Link href='/company-users'>
                <a className={styles.button}>All Company Users</a>
                </Link>
                <Link href={`/company-users/${id}`}>
                <a className={styles.button}>See Company Users Info</a>
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
        <PrivateRoute isAllowed={[1]}>
            <div className='space-y-4 mt-2'>
                <Head>
                <title>Update Company User</title>
                </Head>

                <h2 className='font-bold text-3xl'>Update Company User</h2>

                {error && <Alert title='Error' text={error} type='error' />}

                <CompanyUserForm type='Update' data={data} onSubmit={onSubmit} />
            </div>
        </PrivateRoute>
    )
    }
