import React from 'react'

export default function TaskDetails ({ data }) {
  const styles = {
    container: '',
    div: 'py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200',
    label: 'text-sm font-medium text-gray-500',
    text: 'mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2',
  }

  // render type details
  function TaskType ({ type }) {
    switch (type) {
      case 'Numeric':
        return (
          <>
            <div className={`${styles.div}`}>
              <dt className={styles.label} id='min-label'>Minimum value</dt>
              <dd className={styles.text} id='min'>{data.rule.options.min}</dd> 
            </div>
            <div className={`${styles.div}`}>
              <dt className={styles.label} id='max-label'>Maximum value</dt>
              <dd className={styles.text} id='max'>{data.rule.options.max}</dd> 
            </div>
          </>
        )
      case 'Selection':
        return (
          <>
            {Object.entries(data.rule.options).map(([key, value], index) => (
              (key != 'choices' && 
                <div className={`${styles.div}`} key={key}>
                  <dt className={styles.label} id={`choice${key}-label`}>{`Choice ${key}`}</dt>
                  <dd className={styles.text} id={`choice${key}`}>{value}</dd> 
                </div>
              )
            ))}
          </>
        )
    }
  }

  return (
    <div className=''>
      <dl>
        {/* Title */}
        <div className={`${styles.div} border-none`}>
          <dt className={styles.label} id='title-label'>Title</dt>
          <dd className={styles.text} id='title'>{data.title}</dd> 
        </div>

        {/* Description */}
        <div className={`${styles.div}`}>
          <dt className={styles.label} id='description-label'>Description</dt>
          <dd className={styles.text} id='description'>{data.description}</dd> 
        </div>

        {/* Type */}
        <div className={`${styles.div}`}>
          <dt className={styles.label} id='type-label'>Type</dt>
          <dd className={styles.text} id='type'>{data.rule.type}</dd> 
        </div>

        {/* Type specific components */}
        <TaskType type={data.rule.type} />
      </dl>
    </div>
  )
}
