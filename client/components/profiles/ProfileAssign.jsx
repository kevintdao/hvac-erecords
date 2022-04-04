import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProfileAssign ({ profiles, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, unregister } = useForm()
  const [profilesList, setProfilesList] = useState([{ profile_id: profiles[0].id }])

  const styles = {
    button: 'p-2 bg-blue-700 rounded text-white text-center hover:bg-blue-800',
    addButton: 'p-2 bg-green-700 rounded text-white text-center hover:bg-green-800',
    deleteButton: 'p-2 bg-red-700 rounded text-white text-center hover:bg-red-800',
    input: 'p-2 border rounded border-gray-300',
    inputContainer: 'flex flex-col',
  }

  const addProfile = () => {
    setProfilesList([...profilesList, { profile_id: profiles[0].id }])
  }

  const deleteProfile = (index) => {
    const list = [...profilesList]
    list.splice(index, 1)

    for(let i = 0; i < profilesList.length; i++){
      unregister(`profiles.t${i}`)
    }

    setProfilesList(list)
  }

  const changeProfile = (e, index) => {
    const list = [...profilesList]
    list[index].profile_id = parseInt(e.target.value)
    setProfilesList(list)
  }

  console.log(profilesList)

  return (
    <form action='' method='post' onSubmit={handleSubmit(onSubmit)} className='space-y-4 mt-2'>
      <div className='space-y-2'>
        <label htmlFor='profiles'>Profiles</label>
        {profilesList.map((item, index) => (
          <div className='flex flex-row space-x-2' key={index}>
            <select name={`profiles.t${index}`} id={`profiles.t${index}`} value={item.profile_id} className={`${styles.input} border-gray-300 ${profilesList.length > 1 ? 'basis-5/6' : 'basis-full'}`}
              {...register(`profiles.t${index}`, {
                onChange: (e) => changeProfile(e, index)
              })}
            >
              {profiles.map((item, index) => (
                <option value={item.id} key={item.id}>{`${item.title} (${item.description})`}</option>
              ))}
            </select>
            {profilesList.length > 1 && <button type='button' className={`${styles.deleteButton} basis-1/6`} id={`delete${index}`} onClick={() => deleteProfile(index)}>Delete</button>}
          </div>
        ))}
        <button type='button' className={styles.addButton} onClick={addProfile} id='add-profile'>Add Profile</button>
      </div>
    </form>
  )
}
