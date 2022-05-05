import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function ResetPassword() {
    const router = useRouter();
    const { uidb64, token } = router.query;
    const onSubmit = data => console.log(data);
    const [error, setError] = useState()
    const onSubmit = async (data) => {
      data = {
        "password": data.password,
        "token": token,
        "uidb64": uidb64
      }
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/password-set-complete/`, data)
        .then(res => {
          
        })
        .catch(() => {
          const output = handleError(error)
          setError(output)
        })
    }


    const {password, setPassword} = useState(); // use-form-hook
    const { register, handleSubmit, formState: { errors }, control } = useForm({

  });
    const styles = {
        inputContainer: "flex flex-col",
        input: "p-2 border rounded",
        inputs2Cols: "grid md:grid-cols-2 gap-4 grid-cols-1",
        helpText: "text-sm text-red-700 mt-1",
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
    }

    return (
        <>
            <div>{token}</div>
            <div>{uidb64}</div>
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className={styles.inputContainer}>
                <label htmlFor='password'>Password</label>
                <input
                type="password"
                name="password"
                id="password"
                className={`${styles.input} ${errors.first_name ? "border-red-400" : "border-gray-300"}`}
                {...register('password', {
                  required: {
                  value: true,
                  message: "Enter a Password"
                  }
                })}
              />
              <div className={styles.inputContainer}>
                <label htmlFor='password'>Confirm Password</label>
                <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className={`${styles.input} ${errors.first_name ? "border-red-400" : "border-gray-300"}`}
                {...register('confirm_password', {
                  required: {
                  value: true,
                  message: "confirm password"
                  }
                })}
              />
              </div>
              <span className='text-sm text-red-700 mt-1' id="first_name-help">{errors.first_name?.message}</span>
            </div>

              <button className={styles.button} id='password-button'>Set Password</button>
            </form>

        </>
        
  )
}
