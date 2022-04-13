import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import UnitDetails from '../../components/units/UnitDetails'
import Loading from '../../components/Loading'
import PlanForm from '../../components/plans/PlanForm'
import PlanTable from '../../components/plans/PlanTable'
import Alert from '../../components/Alert'
import { handleError } from '../../utils/errors'
import { QRCodeCanvas } from 'qrcode.react'

export default function Unit (props) {
  const router = useRouter()
  const { id } = router.query
  const [planId, setPlanId] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()
  const [profiles, setProfiles] = useState()
  const qrValue = `${process.env.NEXT_PUBLIC_URL}/service-plans/${id}`

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800'
  }

  const labels = {
    text: ['Unit ID', 'Title', 'Is Planned', 'Repeat', 'Start Date', 'End Date'],
    id: ['unit-id', 'title', 'is-required', 'is-repeat', 'start-date', 'end-date']
  }

  useEffect(() => {
    if (!router.isReady) return

    const fetchData = async () => {
      const units = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/units/${id}/`)
      const profiles = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/profiles`)

      let endpoints = []
      let plansRes = units.data.plans
      for (let i = 0; i < plansRes.length; i++) {
        endpoints.push(`${process.env.NEXT_PUBLIC_HOST}/api/profiles/${plansRes[i].profile}/`)
      }

      let pList = []
      const res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      for (let i = 0; i < res.length; i++) {
        pList.push(res[i].data)
      }

      setProfiles(profiles.data)
      setData({
        unit: units.data,
        plan: units.data.plans,
        profile: pList
      })
    }
    fetchData()
  }, [id, router.isReady])

  const onSubmit = (data) => {
    data.unit = id

    // set default date when is_required is false
    if (data.is_required == false) {
      data.start_date = '1970-1-1'
      data.end_date = '1970-1-1'
    }

    axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/plans`, data)
    .then(res => {
      setPlanId(res.data.id)
    })
    .catch(error => {
      const output = handleError(error)
      setError(output)
    })
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  if (!data) {
    return (<Loading />)
  }

  // successfully created plan
  if (planId) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully created a plan. Click the link below to view the unit/plan details'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <a className={styles.button} onClick={() => window.location = `/units/${id}`}>Unit Details</a>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Unit Details</title>
      </Head>

      <div className='space-y-2'>
        <div className=''>
          <h2 className='font-bold text-3xl'>Unit Details</h2>
          <QRCodeCanvas id='qr-gen' value={qrValue} />
          <a onClick={downloadQRCode}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        <UnitDetails data={data.unit} />

        <div className='space-x-4 mt-2'>
          <Link href='/units'>
            <a className={styles.button} id='all-units'>All Units</a>
          </Link>

          <Link href={`/units/edit/${id}`}>
            <a className={styles.button} id='edit'>Edit</a>
          </Link>
        </div>
      </div>

      <hr />

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>Assigned Profiles</h2>

        {data.unit.plans.length === 0 ? 
          <p className={styles.desc} id='no-plans'>No profiles are assigned to this unit</p> : 
          <PlanTable data={data} labels={labels} />
        }
      </div>

      <hr />

      <div className='space-y-2'>
        <h2 className='font-bold text-3xl'>Assign a Profile</h2>

        {error && <Alert title='Error' text={error} type='error' />}
        
        <PlanForm profiles={profiles} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
