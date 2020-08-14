import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { PostDetailStore } from '../stores/PostDetailStore'
import { PostHeader } from '../components/post/PostHeader'
import { PostContent } from '../components/post/PostContent'
import { basicTheme } from '../styles/basic-theme'
import { PostNavigation } from '../components/post/PostNavigation'
import { Comment } from '../components/comment/Comment'
import { CommentCreator } from '../components/comment/CommentCreator'

const PostStyle = styled.div`
  border: 1px solid ${basicTheme.borderColors.main};
`
const CommentContainerWrapper = styled.div`
  background: ${basicTheme.bgColors.main};
  padding-bottom: 2rem;
`

export const Post = () => {
  const { postId } = useParams()
  const [activeIndex, updateIndex] = useState()

  const toggleCommentOption = (index: number | null) => {
    updateIndex(index)
  }

  return (
    <PostStyle onClick={e => updateIndex(null)}>
      <PostDetailStore id={postId}>
        <PostNavigation />
        <PostHeader />
        <PostContent />
        <CommentContainerWrapper>
          <Comment
            activeIndex={activeIndex}
            updateIndex={toggleCommentOption}
          />
          <CommentCreator />
        </CommentContainerWrapper>
      </PostDetailStore>
    </PostStyle>
  )
}
