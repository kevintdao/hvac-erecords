import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitForm from '../../../components/units/UnitForm';
import Alert from '../../../components/Alert';

export default function Edit({ data }) {
  const router = useRouter();
  const { id } = router.query;
  const [unitId, setUnitId] = useState();
  const [error, setError] = useState();

  const styles = {
    button: "p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800"
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

    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/`, unit)
      .then(res => {
        setUnitId(res.data.id);
      })
      .catch(error => {
        setError("Error with request");
      })
  }

  // successfully updated unit
  if(unitId){
    return (
      <div className='mt-2'>
        <Alert 
          title="Successful"
          text="Successfully updated a unit. Click the link below to the updated unit or all the units"
          type="success"
        />

        <div className='mt-4 space-x-4'>
          <Link href="/units">
            <a className={styles.button}>All units</a>        
          </Link>
          <Link href={`/units/${id}`}>
            <a className={styles.button}>See unit info</a>        
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Update Unit</title>
      </Head>

      <h2 className="font-bold text-3xl">Update Unit</h2>

      {error && <Alert title="Error" text={error} type="error" />}

      <UnitForm type='Update' data={data} onSubmit={onSubmit}/>
    </div>
  )
}

// get unit data before loading the page
export async function getServerSideProps(context){
  const { id } = context.query;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/`);

  return {
    props: {
      data: res.data
    }
  }
}