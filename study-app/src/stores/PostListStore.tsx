import React, { useReducer, useContext, FunctionComponent } from 'react'

import { useFetch } from '../custom-hook/useFetch'
import { Posts, Post } from '../models/Post'
import { PageContext } from './PageStore'
import {
  postListReducer,
  initialState,
  SET_INIT_DATA
} from '../reducers/postList'

export type PostListContextProps = {
  posts: Post[]
  loading: boolean
  dispatch: Function
  handleSetPage: Function
  currentPage: number
  PAGE_SIZE: number
  totalPost: number
}

const PAGE_SIZE = 10

export const PostListConext = React.createContext<PostListContextProps>({
  posts: [],
  loading: false,
  dispatch: () => {},
  handleSetPage: () => {},
  currentPage: 1,
  PAGE_SIZE: PAGE_SIZE,
  totalPost: 0
})

export interface Page {
  currentPage: number
  totalPost: number
}

const PostListProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(postListReducer, initialState)

  const {
    currentPage,
    totalPost,
    handleSetPage,
    handleSetTotalPost
  } = useContext(PageContext)

  const setInitData = (initData: Posts) => {
    dispatch({ type: SET_INIT_DATA, payload: initData.posts })
    handleSetTotalPost(initData.postCount)
  }

  const loading = useFetch(
    setInitData,
    `${process.env.REACT_APP_BASE_URL}/posts?pageNo=${currentPage}&pageSize=${PAGE_SIZE}`,
    [currentPage]
  )

  const { posts } = state
  return (
    <PostListConext.Provider
      value={{
        posts,
        loading,
        dispatch,
        handleSetPage,
        currentPage,
        totalPost,
        PAGE_SIZE
      }}
    >
      {children}
    </PostListConext.Provider>
  )
}

export default PostListProvider
