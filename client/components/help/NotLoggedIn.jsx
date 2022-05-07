import React from 'react'
import Image from 'next/image'
import loginpage from '../../public/screenshots/LoginPage.png'
import registerpage from '../../public/screenshots/RegisterPage.png'

export default function NotLoggedIn() {
  const styles = {
    header: 'font-bold text-3xl text-center',
    sub_header: 'font-bold text-xl',
    container: 'space-y-2 p-2 border border-gray-200 rounded'
  }

  return (
    <div div className='space-y-2'>
      <div className={styles.container}>
        <h2 className={styles.header}>Login</h2>
        <p>To login to the site, enter your email and password. When you enter the incorrect information,
          an error message will display letting you that your information is incorrect.
          As a maintenance company, you can sign up for an account by clicking on the &quot;Don&apos;t have an account?&quot; link or
          clicking on the &quot;Sign Up&quot; button on the navigation bar.
          As a technician, building managers, or inspector, only your maintenance company can create an account for you.
        </p>
        <Image src={loginpage} alt='loginPage' />
      </div>

      <div className={styles.container}>
        <h2 className={styles.header}>Sign Up</h2>
        <p>To sign up for a maintenance company account, enter your company informations along
          with an email and password associated with that company.
        </p>
        <Image src={registerpage} alt='signUpPage' />
      </div>
    </div>
  )
}
