import React, { useContext } from 'react'
import {
  PostDetailContext,
  PostDetailStore
} from '../../stores/PostDetailStore'
import { PostDetail } from '../../models/PostDetail'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'

const PostHeaderStyle = styled.div`
  min-height: 88px;
  padding-right: 1rem;
  padding-left: 1rem;
  border-top: 1px solid ${basicTheme.borderColors.main};
  border-bottom: 1px solid ${basicTheme.borderColors.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  .top {
    font-size: 13px;
    color: ${basicTheme.fontColors.main_light};
  }
  .mid {
    font-size: 20px;
    font-weight: 400;
  }
  .bottom {
    color: ${basicTheme.fontColors.sub_dark};
    font-size: 12px;
    span {
      margin-right: 10px;
      &:nth-child(1) {
        color: ${basicTheme.fontColors.main_light};
      }
    }
    div {
      display: inline-block;
      span {
        margin-right: 0;
        &:nth-child(2) {
          color: ${basicTheme.fontColors.point};
        }
      }
    }
  }
`

export const PostHeader = () => {
  const { post }: { post: PostDetail } = useContext(PostDetailContext)

  if (post) {
    return (
      <PostHeaderStyle>
        <div className="top">
          {post.category} • {post.location}
        </div>
        <div className="mid">{post.title}</div>
        <div className="bottom">
          <span>{post.author.username}</span>
          <span>조회 {post.view_count}</span>
          <span>{post.created_time}</span>
          <div>
            <span>댓글 </span>
            <span>{post.comments.length}</span>
          </div>
        </div>
      </PostHeaderStyle>
    )
  } else {
    return <div>....</div>
  }
}
