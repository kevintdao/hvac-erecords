import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import UnitForm from '../../components/units/UnitForm'
import Alert from '../../components/Alert'

export default function create() {
  const [id, setId] = useState(null);
  const [error, setError] = useState();

  const styles = {
    indigoButton: "p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800"
  }

  const onSubmit = async (data) => {
    const unit = {
      external_id: data.exId,
      category: data.type,
      serial_number: data.serial,
      model_number: data.model,
      manufacturer: data.manufacturer,
      production_date: data.prodDate,
      installation_date: data.installDate
    }

    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/units`, unit)
      .then(res => {
        setId(res.data.id);
      })
      .catch(error => {
        setError("Error with request");
      })
  }

  // successfully created unit
  if(id){
    return (
      <div className='mt-2'>
        <Alert 
          title="Successful"
          text="Successfully created a unit. Click the link below to the newly created unit or all the units"
          type="success"
        />

        <div className='mt-4 space-x-4'>
          <Link href="/units">
            <a className={styles.indigoButton}>All units</a>        
          </Link>
          <Link href={`/units/${id}`}>
            <a className={styles.indigoButton}>See unit info</a>        
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Create Unit</title>
      </Head>

      <h2 className="font-bold text-3xl">Create Unit</h2>

      {error && <Alert title="Error" text={error} type="error" />}

      <UnitForm type='Create' onSubmit={onSubmit}/>
    </div>
  )
}
