import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitDetails from '../../components/UnitDetails'

export default function unit({ data }) {
  const router = useRouter();
  const { id } = router.query;

  const styles = {
    button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
  }
  
  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Unit Details</title>
      </Head>

      <h2 className='font-bold text-3xl'>Unit Details</h2>

      <UnitDetails data={data} id={id}/>

      <div className='space-x-4'>
        <Link href="/units">
          <a className={styles.button}>All Units</a>
        </Link>

        <Link href={`/units/edit/${id}`}>
          <a className={styles.button}>Edit</a>
        </Link>
      </div>
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