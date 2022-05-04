import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import CompanyUserForm from '../../components/company-users/CompanyUserForm'
import Alert from '../../components/Alert'
import { handleError } from '../../utils/errors'
import PrivateRoute from '../../components/PrivateRoute'
import { useAppContext } from '../../context/state'

export default function Create() {
    const [id, setId] = useState(null)
    const [error, setError] = useState()
    const { user } = useAppContext()

    const styles = {
        button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
    }

    const onSubmit = async (data) => {
        data.company = user.user.company
        data.users = [{"email": data.email, "username": data.email, "password": "testpassword"}] // temporary password is necessary until user model is updated
        delete data.email
        console.log(data)
        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/company-users`, data)
            .then(res => {
            setId(res.data.id)
            })
            .catch(() => {
            const output = handleError(error)
            setError(output)
            })
        }

        // successfully created company user
        if (id) {
        return (
                <div className='mt-2'>
                    <Alert
                        title='Successful'
                        text='Successfully created a company user. Click the link below to the newly created company user or all the company users'
                        type='success'
                    />

                    <div className='mt-4 space-x-4'>
                        <Link href='/company-users'>
                        <a className={styles.button}>All Company Users</a>
                        </Link>
                        <Link href={`/company-users/${id}`}>
                        <a className={styles.button}>See Company User Info</a>
                        </Link>
                    </div>
                </div>
            )
        }

        return (
            <PrivateRoute isAllowed={[1]}>
                <div className='space-y-4 mt-2'>
                    <Head>
                    <title>Create Company User</title>
                    </Head>

                    <h2 className='font-bold text-3xl'>Create Company User</h2>

                    {error && <Alert title='Error' text={error} type='error' />}

                    <CompanyUserForm type='Create' onSubmit={onSubmit} />
                </div>
            </PrivateRoute>
        )
}