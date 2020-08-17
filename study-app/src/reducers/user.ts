import { User } from '../models/User'

export const SET_INIT_DATA = 'SET_INIT_DATA'
export const RESET_USER_DATA = 'RESET_USER_DATA'

export type UserAction =
  | {
      type: typeof SET_INIT_DATA
      payload: User
    }
  | {
      type: typeof RESET_USER_DATA
      payload: null
    }

export interface UserState {
  user: User
}

export const initialState: UserState = {
  user: {
    id: null,
    username: null,
    email: null,
    profile_url: null
  }
}
export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case SET_INIT_DATA:
      return {
        user: action.payload
      }
    case RESET_USER_DATA:
      return initialState
    default:
      return initialState
  }
}
