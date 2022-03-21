import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AppContext = createContext()

export function AppProvider ({ children }) {
  const [data, setData] = useState({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false
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
      isLoggedIn: false
    })
  }

  const value = {
    data,
    setData,
    signup,
    login,
    logout
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext () {
  return useContext(AppContext)
}
