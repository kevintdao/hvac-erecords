import React from 'react'

export default function CompanyDetails({ data }) {
    const styles = {
        container: "",
        div: "py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200",
        label: "text-sm font-medium text-gray-500",
        text: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
    }
  
    return (
        <div className=''>
            <dl>
                {/* Company Name */}
                <div className={`${styles.div} border-none`}>
                    <dt className={styles.label} id='name-label'>Company Name</dt>
                    <dd className={styles.text} id='name'>{data.name}</dd> 
                </div>

                {/* Street */}
                <div className={styles.div}>
                    <dt className={styles.label} id="street-label">Street</dt>
                    <dd className={styles.text} id="street">{data.street}</dd> 
                </div>

                {/* City */}
                <div className={styles.div}>
                    <dt className={styles.label} id="city-label">City</dt>
                    <dd className={styles.text} id="city">{data.city}</dd> 
                </div>

                {/* Zip Code */}
                <div className={styles.div}>
                    <dt className={styles.label} id="zip_code-label">Zip Code</dt>
                    <dd className={styles.text} id="zip_code">{data.zip_code}</dd> 
                </div>

                {/* Country */}
                <div className={styles.div}>
                    <dt className={styles.label} id="country-label">Country</dt>
                    <dd className={styles.text} id="country">{data.country}</dd> 
                </div>

                {/* Phone Number */}
                <div className={styles.div}>
                    <dt className={styles.label} id="phone_number-label">Phone Number</dt>
                    <dd className={styles.text} id="phone_number">{data.phone_number}</dd> 
                </div>
            </dl>
        </div>
    )
}
