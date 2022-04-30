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
import { DownloadIcon } from '@heroicons/react/solid'
import PrivateRoute from '../../components/PrivateRoute'

export default function Unit (props) {
  const router = useRouter()
  const { id } = router.query
  const [planId, setPlanId] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()
  const [profiles, setProfiles] = useState()
  const [backendError, setBackendError] = useState()
  const qrValue = `${process.env.NEXT_PUBLIC_URL}/qr-code-redirect/${id}`

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
      .catch(err => {
        const output = handleError(err)
        setBackendError(output)
        return
      })

      if (!units) {
        return
      }

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
  }, [id, router])

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
    downloadLink.download = `unit-${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  if (backendError) {
    return <div className='mt-2 font-bold text-lg' id='message'>{backendError}</div>
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
    <PrivateRoute isAllowed={[1,2]}>
    <div className='space-y-4 mt-2'>
      <Head>
        <title>Unit Details</title>
      </Head>

      <div className='space-y-2'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-3xl'>Unit Details</h2>
          <div className='flex flex-col space-y-2 border border-gray-300 p-2 rounded'>
            <QRCodeCanvas id='qr-gen' value={qrValue} size={64} />
            <a onClick={downloadQRCode} className='flex justify-center' id='qr-download'>
              <DownloadIcon className='h-5 w-5 hover:cursor-pointer' />
            </a>
          </div>
        </div>

        <UnitDetails data={data.unit} />

        <div className='space-x-4 mt-2'>
          <Link href='/units'>
            <a className={styles.button} id='all-units'>All Units</a>
          </Link>

          <Link href={`/units/edit/${id}`}>
            <a className={styles.button} id='edit'>Edit</a>
          </Link>

          <Link href={`/units/records/${id}`}>
            <a className={styles.button} id='data'>Maintenance Data</a>
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
    </PrivateRoute>
  )
}
