import React from 'react'
import { useState, useContext } from 'react'

import { PostDetailContext } from '../../stores/PostDetailStore'
import { PostDetail } from '../../models/PostDetail'
import { UserContext } from '../../stores/UserStore'

import { CommentInputBox } from './CommentInputBox'

export const CommentCreator = () => {
  const {
    post,
    addComment
  }: { post: PostDetail; addComment: Function } = useContext(PostDetailContext)
  const { user } = useContext(UserContext)

  const [comment, dispatchComment] = useState('')

  const onChangeInput = (value: string) => {
    dispatchComment(value)
  }

  const onClickRegister = async () => {
    if (comment === '') {
      alert('내용을 입력해주세요.')
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
      handleClickRegister={onClickRegister}
      defaultText={defaultText}
      disable={!user}
    />
  )
}
