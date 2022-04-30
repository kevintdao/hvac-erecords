import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from '../../../components/Header'
import TaskForm from '../../../components/tasks/TaskForm'
import Alert from '../../../components/Alert'
import Loading from '../../../components/Loading'
import { handleError } from '../../../utils/errors'
import PrivateRoute from '../../../components/PrivateRoute'

export default function Edit (props) {
  const router = useRouter()
  const { id } = router.query
  const [taskId, setTaskId] = useState()
  const [error, setError] = useState()
  const [data, setData] = useState()
  const [backendError, setBackendError] = useState()

  const styles = {
    button: 'p-2 bg-indigo-700 rounded text-white text-center hover:bg-indigo-800'
  }

  useEffect(() => {
    if (!router.isReady) return

    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/${id}/`)
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
    const type = data.type

    var values = { title: data.title, description: data.description, rule: {type: data.type} }
    switch(type){
      case 'Numeric':
        values.rule.options = data.Numeric
        break
      case 'Selection':
        values.rule.options = getSelectionChoices(data.selection)
        break
    }

    values.company = 1

    axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/tasks/${id}/`, values)
      .then(res => {
        setTaskId(res.data.id)
      })
      .catch(() => {
        const output = handleError(error)
        setError(output)
      })
  }

  const getSelectionChoices = (selection) => {
    const numChoices = selection.choices
    const output = {}
    for(let i = 1; i <= numChoices; i++){
      output[i] = selection[`c${i}`]
    }
    output.choices = numChoices
    return output
  }

  // successfully updated task
  if (taskId) {
    return (
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully updated a task. Click the link below to the updated task or all the tasks'
          type='success'
        />

        <div className='mt-4 space-x-4'>
          <Link href='/tasks'>
            <a className={styles.button}>All Tasks</a>
          </Link>
          <Link href={`/tasks/${id}`}>
            <a className={styles.button}>See Task Info</a>
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
      <Header title='Update Task' />

      <h2 className='font-bold text-3xl'>Update Task</h2>

      {error && <Alert title='Error' text={error} type='error' />}

      <TaskForm type='Update' data={data} onSubmit={onSubmit} />
    </div>
    </PrivateRoute>
  )
}
