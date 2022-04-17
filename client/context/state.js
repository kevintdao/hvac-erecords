import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'

export const AppContext = createContext()

export function AppProvider ({ children }) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    user: null,
    relog: false,
  })

  // remove username later
  // hard-coded value for now since still login with username
  function signup (email, password) {
    const data = {
      username: email,
      email: email,
      password: password
    }

    return axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/register/`, data)
  }

  // remove username later
  // hard-coded value for now since still login with username
  function login (email, password) {
    const data = {
      username: email,
      password: password
    }

    return axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/token/`, data)
  }

  function logout () {
    setData({
      ...data,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: null,
      relog: false
    })
  }

  const value = {
    data,
    setData,
    signup,
    login,
    logout
  }

  async function loadData () {
    setLoading(true)

    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    var user = null
    var relog = false

    let hardCodedUser
    if (access) {
      await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }).then(res => {
        console.log(res.data.role)
        hardCodedUser = {
          ...res.data,
          role: res.data.role ? res.data.role : 'Company'
        }
        // user = res.data
      }).catch(error => {
        relog = true
      })
    }

    setData({
      accessToken: access,
      refreshToken: refresh,
      isLoggedIn: access != null && refresh != null,
      user: hardCodedUser,
      relog: relog
    })

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  if(loading){
    return (
      <Loading />
    )
  }

  if(data.relog){
    const relogin = () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location = '/login'
    }

    return (
      <div className='mt-2 flex item-center justify-center py-2'>
        <div className='flex-col flex justify-center'>
          <h2 className='text-3xl font-bold'>Session Expired!</h2>
          <p className='text-center'>Please re-login</p>
          <button className='mt-2 p-2 bg-blue-700 rounded text-white text-center font-bold hover:bg-blue-800' onClick={relogin}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  )
}

export function useAppContext () {
  return useContext(AppContext)
}
