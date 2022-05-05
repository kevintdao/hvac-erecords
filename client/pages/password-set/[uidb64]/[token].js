import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm, } from 'react-hook-form';

export default function ResetPassword() {
    const router = useRouter();
    const { uidb64, token } = router.query;
    const onSubmit = data => console.log(data);
    // const onSubmit = async (data) => {
    //   data = {
    //     "password": data.password,
    //     "token": token,
    //     "uidb64": uidb64
    //   }
    //   axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/password-set-complete/`, data)
    //     .then(res => {
          
    //     })
    //     .catch(() => {
    //       const output = handleError(error)
    //       setError(output)
    //     })
    // }



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

    return (
        <>
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
              <span className='text-sm text-red-700 mt-1' id="password-help">{errors.Passowrd?.message}</span>
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
                  message: "Confirm Password"
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

        </>
        
  )
}
