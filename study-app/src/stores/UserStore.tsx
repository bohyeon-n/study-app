import React, { FunctionComponent, useReducer } from 'react'
import { useFetch } from '../custom-hook/useFetch'
import {
  userReducer,
  initialState,
  SET_INIT_DATA,
  RESET_USER_DATA
} from '../reducer/user'
import { User } from '../models/User'

export type UserContextProps = {
  user: User
  logout: Function
}

export const UserContext = React.createContext<UserContextProps>({
  user: initialState.user,
  logout: () => {}
})

const UserProvider: FunctionComponent = ({ children }) => {
  const [state, setUserState] = useReducer(userReducer, initialState)

  const TOKEN_NAME = 'login_token'

  const setInitData = (initUserData: User) => {
    if (initUserData.id == null) {
      setUserState({ type: SET_INIT_DATA, payload: initialState.user })
    } else {
      setUserState({ type: SET_INIT_DATA, payload: initUserData })
    }
  }

  const resetData = () => {
    setUserState({ type: RESET_USER_DATA, payload: null })
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

  const { user } = state

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
