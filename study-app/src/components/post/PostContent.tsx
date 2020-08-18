import React, { useContext } from 'react'
import { PostContext, PostContextProps } from '../../stores/PostStore'
import styled from 'styled-components'

const PostContentWrapper = styled.div`
  white-space: pre;
  width: 100%;
  min-height: 200px;
  line-height: 1.6;
  padding: 1rem;
  box-sizing: border-box;
`

export const PostContent = () => {
  const { post }: PostContextProps = useContext(PostContext)
  return post ? (
    <PostContentWrapper>{post.content}</PostContentWrapper>
  ) : (
    <div>....</div>
  )
}
