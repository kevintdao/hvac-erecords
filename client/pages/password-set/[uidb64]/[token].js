import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import { useForm, } from 'react-hook-form';
import Alert from '../../../components/Alert';
import Header from '../../../components/Header'

export default function ResetPassword() {
    const router = useRouter();
    const { uidb64, token } = router.query;

    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
      mode: 'onTouched'
    });
    const password = watch('password')

    const styles = {
        inputContainer: "flex flex-col",
        input: "p-2 border rounded",
        inputs2Cols: "grid md:grid-cols-2 gap-4 grid-cols-1",
        helpText: "text-sm text-red-700 mt-1",
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
    }

    const onSubmit = async (data) => {
      data = {
        "password": data.password,
        "token": token,
        "uidb64": uidb64
      }
      axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/password-set-complete/`, data)
        .then(res => {
          setSuccess(true)
        })
        .catch(err => {
          const output = handleError(error)
          setError(output)
        })
    }

    if(success){
      return(
      <div className='mt-2'>
        <Alert
          title='Successful'
          text='Successfully Set Password'
          type='success'
        />
      </div>
      )
    }

    return (
        <div className='space-y-4 mt-2'>
            <Header title='Set password' />
            <h2 className="font-bold text-3xl">Set Password</h2>
            {error && <Alert title='Error' text={error} type='error' />}
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className={styles.inputContainer}>
                <label htmlFor='password'>Password</label>
                <input
                type="password"
                name="password"
                id="password"
                className={`${styles.input} ${errors.password ? "border-red-400" : "border-gray-300"}`}
                {...register('password', {
                  required: {
                  value: true,
                  message: "Enter a Password",
                  minLength: 1
                  }
                })}
              />
              <span className='text-sm text-red-700 mt-1' id="password-help">{errors.password?.message}</span>
              <div className={styles.inputContainer}>
                <label htmlFor='confirm_password'>Confirm Password</label>
                <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className={`${styles.input} ${errors.confirm_password ? "border-red-400" : "border-gray-300"}`}
                {...register('confirm_password', {
                  required: {
                  value: true,
                  message: "Enter a Password",
                  minLength: 1
                  },
                  validate: (value) =>
                  value === password || "The passwords do not match",
                })}
              />
              </div>
              <span className='text-sm text-red-700 mt-1' id="confirm_password-help">{errors.confirm_password?.message}</span>
            </div>
              <input type="submit" className={styles.button} id='password-button' value="Set Password"/>
            </form>
        </div>
  )
}
