import React, { useReducer } from 'react'
import { postDetailReducer } from '../reducer/reducer'
import { useFetch } from '../custom-hook/useFetch'
import { PostDetail } from '../models/PostDetail'
import { Comment } from '../models/Comment'

export const PostDetailContext = React.createContext<any | undefined>(undefined)

export const PostDetailStore = ({
  id,
  children
}: {
  id: number
  children: React.ReactNode
}) => {
  const [post, dispatch]: [PostDetail, Function] = useReducer(
    postDetailReducer,
    null
  )

  const setInitData = (initData: PostDetail) => {
    dispatch({ type: 'SET_INIT_DATA', payload: initData })
  }

  const addComment = (newData: any) => {
    dispatch({ type: 'ADD_COMMENT', payload: newData })
  }

  const deleteComment = (deletedId: number) => {
    const newComments = post.comments.filter(
      comment => comment.id !== deletedId
    )

    dispatch({ type: 'DELETE_COMMENT', payload: newComments })
  }

  const updateComment = (updatedId: number, newComment: Comment) => {
    const newComments = post.comments.map(comment => {
      if (comment.id === updatedId) {
        comment = newComment
      }
      return comment
    })

    dispatch({ type: 'UPDATE_COMMENT', payload: newComments })
  }

  const loading = useFetch(
    setInitData,
    `${process.env.REACT_APP_BASE_URL}/posts/${id}`
  )

  return (
    <PostDetailContext.Provider
      value={{ post, addComment, deleteComment, loading, updateComment }}
    >
      {children}
    </PostDetailContext.Provider>
  )
}
