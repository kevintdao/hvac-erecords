import React from "react";

export default function BuildingDetails({data}) {
    const styles = {
        container: "",
        div: "py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200",
        label: "text-sm font-medium text-gray-500",
        text: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
    }

    return (
        <div className="">
            <dl>
                {/* Building manager */}
                <div className={`${styles.div} border-none`}>
                <dt className={styles.label} id="manager-label">Building Manager</dt>
                <dd className={styles.text} id="manager">{`${data.manager.name} (${data.manager.phone_number})`}</dd>
                </div>

                {/* Site Name */}
                <div className={styles.div}>
                <dt className={styles.label} id="site_name-label">Site Name</dt>
                <dd className={styles.text} id="site_name">{data.site_name}</dd>
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
            </dl>
        </div>
    )
}
