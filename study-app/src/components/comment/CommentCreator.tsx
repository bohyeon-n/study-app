import React from 'react'
import { useState, useContext } from 'react'

import { PostContext, PostContextProps } from '../../stores/PostStore'
import { UserContext } from '../../stores/UserStore'

import { CommentInputBox } from './CommentInputBox'

export const CommentCreator = () => {
  const { post, addComment }: PostContextProps = useContext(PostContext)
  const { user } = useContext(UserContext)

  const [comment, dispatchComment] = useState('')

  const [isAutoFocus, setAutoFocusState] = useState(false)

  const onChangeInput = (e: any) => {
    dispatchComment(e.target.value)
  }

  const onClickCreate = async () => {
    if (comment === '') {
      setAutoFocusState(true)
      setTimeout(() => {
        setAutoFocusState(false)
      }, 0)
      return
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        content: comment,
        post_id: post.id
      })
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comments`,
      requestOptions
    )
    const updatedData = await response.json()

    addComment(updatedData)
    dispatchComment('')
  }
  const defaultText = user
    ? comment
    : '로그인을 하셔야 댓글에 글을 쓸 수 있습니다.'

  return (
    <CommentInputBox
      handleChangeInput={onChangeInput}
      handleClickRegister={onClickCreate}
      defaultText={defaultText}
      disable={!user.id}
      autoFocus={isAutoFocus}
    />
  )
}
