import React from 'react'
import Head from 'next/head'

export default function create() {
  const hvacTypes = [
    "Heating and cooling split system",
    "Hybrid split system",
    "Duct free",
    "Packaged heating and air conditioning system"
  ]

  const styles = {
    inputContainer: "flex flex-col",
    input: "p-2 border rounded"
  }

  return (
    <div>
      <Head>
        <title>Create Unit</title>
      </Head>

      {/* Unit Create Page (Create a new unit) */}

      <h2 className="font-bold text-3xl">Create Unit</h2>

      {/* Type */}
      <div className={styles.inputContainer}>
        <label htmlFor="type">Type</label>
        <select name="type" id="type" className={`${styles.input} border-gray-300`}>
          {hvacTypes.map((data, index) => (
            <option value={index}>{data}</option>
          ))}
        </select>
      </div>

      {/* External ID */}
      <div className={styles.inputContainer}>
        <label htmlFor="ex-id">External ID</label>
        <input type="text" name="ex-id" id="ex-id" className={`${styles.input} border-gray-300`}/>
      </div>

      {/* Serial Number */}
      <div className={styles.inputContainer}>
        <label htmlFor="serial">Serial Nunber</label>
        <input type="text" name="serial" id="serial" className={`${styles.input} border-gray-300`}/>
      </div>

      {/* Manufacturer */}
      <div className={styles.inputContainer}>
        <label htmlFor="manufacturer">Manufacturer</label>
        <input type="text" name="manufacturer" id="manufacturer" className={`${styles.input} border-gray-300`}/>
      </div>

      {/* Production Date */}
      <div className={styles.inputContainer}>
        <label htmlFor="prod-date">Production Date</label>
        <input type="date" name="prod-date" id="prod-date" className={`${styles.input} border-gray-300`}/>
      </div>

      {/* Installation Date */}
      <div className={styles.inputContainer}>
        <label htmlFor="install-date">Installation Date</label>
        <input type="date" name="install-date" id="install-date" className={`${styles.input} border-gray-300`}/>
      </div>
    </div>
  )
}
