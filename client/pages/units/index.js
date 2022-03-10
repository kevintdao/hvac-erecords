import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import UnitTable from '../../components/units/UnitTable'

export default function Index(props) {
  const data = props.data;
  const labels = ["External ID", "Model Number", "Serial Number", "Type", "Manufacturer"];

  const styles = {
    button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
  }

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Units</title>
      </Head>

      <h2 className='font-bold text-3xl'>Units</h2>
  
      <UnitTable data={data} labels={labels} />

      <div className='mt-2'>
        <Link href="/units/create">
          <a className={styles.button}>New Unit</a>
        </Link>
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units`);

  return {
    props: {
      data: res.data
    }
  }
}
