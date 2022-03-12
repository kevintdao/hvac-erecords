import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import TechnicianTable from '../../components/technicians/TechnicianTable'

export default function Index(props) {
    const data = props.data;
    const labels = {
        text: ["User ID", "Company ID", "First Name", "Last Name"],
        id: ["user_id", "company_id", "first_name", "last_name"],
    };

    const styles = {
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
        desc: "font-medium font-gray-900"
    }

    return (
        <div className='space-y-4 mt-2'>
          <Head>
            <title>Technicians</title>
          </Head>
    
          <h2 className='font-bold text-3xl'>Technicians</h2>
    
          {data.length == 0 ? <p className={styles.desc}>No existing technicians</p> : <TechnicianTable data={data} labels={labels} />}
        </div>
    )
}

// get technician data before loading the page
export async function getServerSideProps(context){
    const { id } = context.query;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/technician/${id}/`);
  
    return {
        props: {
            data: res.data
        }
    }
}