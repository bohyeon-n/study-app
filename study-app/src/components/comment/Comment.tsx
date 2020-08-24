import React, { useContext, FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'
import { Comment as CommentData } from '../../models/Comment'
import { Comment as CommentModel } from '../../models/Comment'
import { PostContext, PostContextProps } from '../../stores/PostStore'
import { Dropdown } from '../../style-components/dropdown/Dropdown'

import { OptionDot } from '../../style-components/icon/OptionDot'
import { Menu } from '../../style-components/menu/Menu'
import { MenuItem } from '../../style-components/menu/MenuItem'
import { UserContext, UserContextProps } from '../../stores/UserStore'
import { User } from '../../models/User'
import { CommentInputBox } from './CommentInputBox'

const CommentStyle = styled.div`
  width: 100%;
  background: ${basicTheme.bgColors.main};
  font-size: 13px;
`

const CommentItem = styled.div`
  border-bottom: 1px solid ${basicTheme.borderColors.main};
  padding: 1rem;
`
const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 12px;
    &:nth-child(2) {
      margin-left: 10px;
      color: ${basicTheme.fontColors.sub};
      font-size: 11px;
    }
  }
`

const CommentContent = styled.div`
  margin-top: 5px;
  white-space: pre;
`
const OptionItem = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  &:hover {
    background: ${basicTheme.fontColors.allow};
    color: ${basicTheme.fontColors.white};
  }
`

const DeleteOptionItem = styled(OptionItem)`
  &:hover {
    background: ${basicTheme.fontColors.alert};
  }
`

export interface CommentProps {
  updateIndex: Function
  activeIndex: number
}

export const Comment: FunctionComponent<CommentProps> = ({
  updateIndex,
  activeIndex
}) => {
  const { post, deleteComment, updateComment }: PostContextProps = useContext(
    PostContext
  )
  const { user }: UserContextProps = useContext(UserContext)

  const [activeCommentInputId, changeAcitveCommentId] = useState()

  const [commentContent, updateCommentContent] = useState('')

  const onClickDeleteBtn = async (id: number) => {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
      requestOptions
    )
    deleteComment(id)
  }

  const OnClickUdpateBtn = (id: number, value: string) => {
    updateCommentContent(value)
    updateIndex()
    changeAcitveCommentId(id)
  }

  const handleChangeInput = (e: any) => {
    updateCommentContent(e.target.value)
  }

  const handleClickRegister = async () => {
    let preComment: CommentModel = {} as CommentModel
    let updatedComment: CommentModel = {} as CommentModel

    post.comments.forEach(comment => {
      if (comment.id === activeCommentInputId) {
        preComment = { ...comment }
        comment.content = commentContent
        updatedComment = comment
      }
    })

    if (
      updatedComment.content !== null &&
      preComment.content != updatedComment.content
    ) {
      requestCommentUpdate(activeCommentInputId, updatedComment)
    }
  }

  const requestCommentUpdate = async (id: number, newComment: CommentModel) => {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        content: newComment.content
      })
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
      requestOptions
    ).then(response => response.json())

    updateComment(response)

    changeAcitveCommentId(null)
  }

  const CommentOption = (id: number, value: string) => (
    <Menu>
      <MenuItem>
        <OptionItem onClick={e => OnClickUdpateBtn(id, value)}>수정</OptionItem>
      </MenuItem>
      <MenuItem>
        <DeleteOptionItem onClick={e => onClickDeleteBtn(id)}>
          삭제
        </DeleteOptionItem>
      </MenuItem>
    </Menu>
  )

  return post ? (
    <CommentStyle>
      {post.comments.map((comment: CommentData, index: number) => (
        <CommentItem key={index}>
          <CommentHeader>
            <div>
              <span>{comment.author.username}</span>
              <span>{comment.created_time}</span>
            </div>
            {user && user.id === comment.author.id && (
              <Dropdown
                overlay={CommentOption(comment.id, comment.content)}
                updateIndex={updateIndex}
                activeIndex={activeIndex}
                index={comment.id}
              >
                <OptionDot />
              </Dropdown>
            )}
          </CommentHeader>
          <CommentContent>{comment.content}</CommentContent>
          {activeCommentInputId === comment.id && (
            <CommentInputBox
              handleClickRegister={handleClickRegister}
              handleChangeInput={handleChangeInput}
              defaultText={commentContent}
              disable={false}
            />
          )}
        </CommentItem>
      ))}
    </CommentStyle>
  ) : null
}
