import React from 'react'
import Image from 'next/image'
import loginpage from '../../public/screenshots/LoginPage.png'

export default function NotLoggedIn() {
  const styles = {
    header: 'font-bold text-3xl',
    sub_header: 'font-bold text-xl'
  }

  return (
    <div div className='space-y-2'>
      <div>
        <h2 className={styles.header}>Login</h2>
        <p>To login to the site, enter your email and password. When you enter the incorrect information,
          an error message will display letting you that your information is incorrect.
          As a maintenance company, you can sign up for an account by clicking on the "Don't have an account?" link or
          clicking on the "Sign Up" button on the navigation bar.
          As a technician, building managers, or inspector, only your maintenance company can create an account for you.
        </p>
        <Image src={loginpage} />
      </div>

      <div>
        <h2 className={styles.header}>Sign Up</h2>
        <p>To sign up for a maintenance company account, enter your company informations along
          with an email and password associated with that company.
        </p>
        <Image src={loginpage} />
      </div>
    </div>
  )
}
