import React, { FunctionComponent, useReducer } from 'react'
import { useFetch } from '../custom-hook/useFetch'
import { userReducer } from '../reducer/reducer'
import { User } from '../models/User'

export interface UserStoreType {
  user: User | null
  dispatch: Function
  logout: Function
}

export const UserContext = React.createContext<any | undefined>(undefined)

const UserStore: FunctionComponent<any> = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  const TOKEN_NAME = 'login_token'

  const setInitData = (initData: User) => {
    if (initData.id == null) {
      dispatch({ type: 'SET_INIT_DATA', payload: null })
    } else {
      dispatch({ type: 'SET_INIT_DATA', payload: initData })
    }
  }

  const resetData = () => {
    dispatch({ type: 'RESET_DATA', payload: null })
  }

  const logout = () => {
    resetData()
    deleteCookie()
  }

  const deleteCookie = () => {
    document.cookie = TOKEN_NAME + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  const getToken = () => {
    return document.cookie.split(';').some(c => {
      return c.trim().startsWith(TOKEN_NAME + '=')
    })
  }

  useFetch(setInitData, `${process.env.REACT_APP_BASE_URL}/me`)

  return (
    <UserContext.Provider value={{ user, dispatch, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserStore
