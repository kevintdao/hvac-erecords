import React from 'react'

export default function ProfileDetails ({ data }) {
  const styles = {
    container: "",
    div: "py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200",
    label: "text-sm font-medium text-gray-500",
    text: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
  }

  return (
    <div className=''>
      <dl>
        {/* Title */}
        <div className={`${styles.div} border-none`}>
          <dt className={styles.label} id='title-label'>Title</dt>
          <dd className={styles.text} id='title'>{data.profile.title}</dd> 
        </div>

        {/* Description */}
        <div className={styles.div}>
          <dt className={styles.label} id="description-label">Description</dt>
          <dd className={styles.text} id="description">{data.profile.description}</dd> 
        </div>

        {/* Number of tasks */}
        <div className={styles.div}>
          <dt className={styles.label} id="num-tasks-label">Number of Tasks</dt>
          <dd className={styles.text} id="num-tasks">{data.tasks.length}</dd> 
        </div>

        {/* Tasks */}
        <div className={styles.div}>
          <dt className={styles.label} id="tasks-label">Task(s)</dt>
          <div className='space-y-2'>
            {data.tasks.map((item, i) => (
              <dd className={`${styles.text}`} key={i} id={`task-${item.id}`}>{`${item.title} (${item.rule.type})`}</dd> 
            ))}
          </div>

        </div>
      </dl>
    </div>
  )
}
