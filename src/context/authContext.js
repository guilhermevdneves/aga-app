import React, { useEffect, useState } from 'react'
import { getUserStorage, setUserStorage } from '../storage/authStorage'

export const authContext = React.createContext({})

export const useAuthContext = () => React.useContext(authContext)

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState()

  const setToken = async (payload) => {
    await setUserStorage(payload);
    setAuthToken(payload)
  } 

  useEffect(() => {
    const getUserFromStorage = async () => {
      const user = await getUserStorage();
      if(user) {
        setAuthToken(user);
      }
    }

    getUserFromStorage();
  },[]);

  return (
    <authContext.Provider value={{ authToken, setAuthToken: setToken }}>
      {children}
    </authContext.Provider>
  )
}
