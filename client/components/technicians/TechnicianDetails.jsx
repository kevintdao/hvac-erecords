import React from 'react'

export default function TechnicianDetails({data}) {
    const styles = {
        container: "",
        div: "py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200",
        label: "text-sm font-medium text-gray-500",
        text: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
    }

    return (
        <div className=''>
            <dl>
                {/* User ID */}
                <div className={`${styles.div} border-none`}>
                <dt className={styles.label} id='user_id-label'>User ID</dt>
                <dd className={styles.text} id='user_id'>{data.user_id}</dd>
                </div>
        
                {/* Company ID */}
                <div className={styles.div}>
                <dt className={styles.label} id="company_id-label">Company ID</dt>
                <dd className={styles.text} id="company_id">{data.company_id}</dd>
                </div>
        
                {/* First Name */}
                <div className={styles.div}>
                <dt className={styles.label} id="first_name-label">First Name</dt>
                <dd className={styles.text} id="first_name">{data.first_name}</dd>
                </div>
        
                {/* Last Name */}
                <div className={styles.div}>
                <dt className={styles.label} id="last_name-label">Last Name</dt>
                <dd className={styles.text} id="last_name">{data.last_name}</dd>
                </div>
        
                {/* Phone Number */}
                <div className={styles.div}>
                <dt className={styles.label} id="phone_number-label">Phone Number</dt>
                <dd className={styles.text} id="phone_number">{data.phone_number}</dd>
                </div>
        
                {/* License Number */}
                <div className={styles.div}>
                <dt className={styles.label} id="license_number-label">License Number</dt>
                <dd className={styles.text} id="license_number">{data.license_number}</dd>
                </div>
        
            </dl>
        </div>
    )
}
