import React from 'react'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'
import { Post } from '../../models/Post'
import { Link } from 'react-router-dom'

export const PostItemWrapper = styled.div`
  height: 100px;
  border-bottom: 1px solid ${basicTheme.borderColors.main};
  padding: 1rem;
  box-sizing: border-box;
  :hover {
    background: ${basicTheme.bgColors.hover};
  }
  .top {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    span {
      a {
        text-decoration: none;
        color: ${basicTheme.fontColors.main};
        &:visited {
          color: ${basicTheme.fontColors.sub};
        }
      }
    }
    &:hover {
      text-decoration: underline;
    }
  }
  .mid {
    font-size: 12px;
    margin-top: 10px;
    color: ${basicTheme.fontColors.sub};
    span:nth-child(2) {
      padding-right: 5px;
    }
  }
  .bottom {
    color: ${basicTheme.fontColors.sub};
    margin-top: 5px;
    font-size: 12px;
  }
`

export const CommentBox = styled.span`
  margin-left: 10px;
  width: 21px;
  height: 16px;
  border: 1px solid ${basicTheme.fontColors.sub};
  border-radius: 10px;
  display: inline-block;
  line-height: 16px;
  text-align: center;
  color: ${basicTheme.fontColors.point};
  font-size: 13px;
  font-weight: 600;
`

export const Item = ({ post }: { post: Post }) => {
  return (
    <PostItemWrapper>
      <div className="top">
        <span>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </span>
        <CommentBox>{post.comment_count}</CommentBox>
      </div>
      <div className="mid">
        <span>{post.author.username} • </span>
        <span>{post.created_time} • </span>
        <span>조회 {post.view_count}</span>
      </div>
      <div className="bottom">
        <span>{post.location} • </span>
        <span>{post.category}</span>
      </div>
    </PostItemWrapper>
  )
}
