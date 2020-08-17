import { Post } from '../models/Post'

export const SET_INIT_DATA = 'SET_INIT_DATA'

export type PostListActions = {
  type: typeof SET_INIT_DATA
  payload: Post[]
}

export interface PostListState {
  posts: Post[]
}

export const initialState = {
  posts: []
}

export const postListReducer = (
  state: PostListState,
  action: PostListActions
): PostListState => {
  switch (action.type) {
    case SET_INIT_DATA:
      return {
        posts: action.payload
      }
    default:
      return initialState
  }
}
