import React, { useContext } from 'react'
import { PostDetail } from '../../models/PostDetail'
import { PostDetailContext } from '../../stores/PostDetailStore'
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
  const { post }: { post: PostDetail } = useContext(PostDetailContext)
  return post ? (
    <PostContentWrapper>{post.content}</PostContentWrapper>
  ) : (
    <div>....</div>
  )
}
