import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import UnitTable from '../../components/units/UnitTable'

export default function index(props) {
  const data = props.data;
  const labels = ["External ID", "Model Number", "Serial Number", "Type", "Manufacturer"];

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Units</title>
      </Head>

      {/* Units Index Page (List table of units) */}

      <h2 className='font-bold text-3xl'>Units</h2>
  
      <UnitTable data={data} labels={labels} />
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
