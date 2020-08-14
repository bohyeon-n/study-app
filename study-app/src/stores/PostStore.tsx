import React, { useReducer, useState, useContext } from 'react'
import { postReducer } from '../reducer/reducer'
import { useFetch } from '../custom-hook/useFetch'
import { Posts } from '../models/Post'
import { PageContext } from './PageStore'

export const PostContext = React.createContext<any | undefined>(undefined)
export interface Page {
  currentPage: number
  totalPost: number
}
const PostStore = ({ children }: { children: React.ReactNode }) => {
  const [posts, dispatch]: any = useReducer(postReducer, [])

  const {
    currentPage,
    totalPost,
    handleSetPage,
    handleSetTotalPost
  } = useContext(PageContext)

  const PAGE_SIZE = 10

  const setInitData = (initData: Posts) => {
    dispatch({ type: 'SET_INIT_DATA', payload: initData.posts })
    handleSetTotalPost(initData.postCount)
  }

  const loading = useFetch(
    setInitData,
    `${process.env.REACT_APP_BASE_URL}/posts?pageNo=${currentPage}&pageSize=${PAGE_SIZE}`,
    [currentPage]
  )

  return (
    <PostContext.Provider
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
    </PostContext.Provider>
  )
}

export default PostStore
