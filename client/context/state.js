import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'

const AppContext = createContext()

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
      username: 'test',
      email: 'test@test.com',
      password: '123456'
    }

    return axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/register/`, data)
  }

  // remove username later
  // hard-coded value for now since still login with username
  function login (email, password) {
    const data = {
      username: 'test',
      password: '123456'
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
    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    var user = null
    var relog = false

    if (access) {
      await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      }).then(res => {
        user = res.data
      }).catch(error => {
        relog = true
      })
    }

    setData({
      accessToken: access,
      refreshToken: refresh,
      isLoggedIn: access != null && refresh != null,
      user: user,
      relog: relog
    })
  }

  useEffect(() => {
    setLoading(true)
    loadData()
    setLoading(false)
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
