import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function ResetPassword() {
    const router = useRouter();
    const { id, resetToken } = router.query;



    const styles = {
        inputContainer: "flex flex-col",
        input: "p-2 border rounded",
        inputs2Cols: "grid md:grid-cols-2 gap-4 grid-cols-1",
        helpText: "text-sm text-red-700 mt-1",
        button: "p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800",
    }

    return (
        <>
            <div>[resetToken]</div>
            <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                <div className={styles.inputs2Cols}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            className={`${styles.input} ${errors.name ? "border-red-400" : "border-gray-300"}`}
                            {...register('password', {
                                    required: {
                                    value: true,
                                    message: "Enter a password"
                                }
                            })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="password-help">{errors.password?.message}</span>
                        <div className={styles.inputContainer}>
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input 
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            className={`${styles.input} ${errors.name ? "border-red-400" : "border-gray-300"}`}
                            {...register('confirmpassword', {
                                    required: {
                                    value: true,
                                    message: "Confirm password"
                                }
                            })}
                        />
                        <span className='text-sm text-red-700 mt-1' id="confirm-password-help">{errors.password?.message}</span>

                    </div>
                </div>
                <div>
                    <button className={styles.button} id='password-button'>Submit</button>
                </div>
            </form>

        </>
        
  )
}
