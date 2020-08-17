import React, { useReducer, ReactNode } from 'react'
import {
  postReducer,
  initialState,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from '../reducer/post'

import { useFetch } from '../custom-hook/useFetch'
import { PostDetail } from '../models/PostDetail'
import { Comment } from '../models/Comment'
import { SET_INIT_DATA } from '../reducer/user'

export type PostContextProps = {
  post: PostDetail
  addComment: Function
  deleteComment: Function
  loading: boolean
  updateComment: Function
}

export const PostContext = React.createContext<PostContextProps>({
  post: initialState.post,
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
  loading: false
})

export const PostProvider = ({
  id,
  children
}: {
  id: number
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(postReducer, initialState)

  const setInitData = (initData: PostDetail) => {
    dispatch({ type: SET_INIT_DATA, payload: initData })
  }

  const addComment = (newData: any) => {
    dispatch({ type: ADD_COMMENT, payload: newData })
  }

  const deleteComment = (deletedId: number) => {
    const newComments = state.post.comments.filter(
      (comment: Comment) => comment.id !== deletedId
    )

    dispatch({ type: DELETE_COMMENT, payload: newComments })
  }

  const updateComment = (updatedId: number, newComment: Comment) => {
    const newComments = state.post.comments.map((comment: Comment) => {
      if (comment.id === updatedId) {
        comment = newComment
      }
      return comment
    })

    dispatch({ type: UPDATE_COMMENT, payload: newComments })
  }

  const loading = useFetch(
    setInitData,
    `${process.env.REACT_APP_BASE_URL}/posts/${id}`
  )

  const { post } = state
  return (
    <PostContext.Provider
      value={{ post, addComment, deleteComment, loading, updateComment }}
    >
      {children}
    </PostContext.Provider>
  )
}
