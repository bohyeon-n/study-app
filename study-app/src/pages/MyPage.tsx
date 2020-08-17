import React, { FunctionComponent, useContext, useState } from 'react'
import { UserContext, UserContextProps } from '../stores/UserStore'
import styled from 'styled-components'
import { basicTheme } from '../styles/basic-theme'
import { PostItemWrapper, CommentBox } from './../components/post/PostItem'
import { Link } from 'react-router-dom'
import { useFetch } from '../custom-hook/useFetch'
import { UserActivity } from '../models/UserActivity'
import { Post } from '../models/Post'

const MyPageWrapper = styled.div``

const UserInfoWrapper = styled.div`
  border: 2px solid ${basicTheme.borderColors.main};
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`

const Tabs = styled.div`
  display: flex;
`
const TabTitle = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 700;
  width: 50%;
  padding-left: 1rem;
  font-size: 14px;
  border: 1px solid ${basicTheme.borderColors.main};
  box-sizing: border-box;
  &:hover {
    background: ${basicTheme.bgColors.hover};
  }
  &.active {
    border-bottom: 2px solid ${basicTheme.bgColors.allow};
  }
`
const TabContent = styled.div`
  display: none;
  &.active {
    display: block;
  }
`

const Posts = styled.div``
const Comments = styled.div``
const UserActivityWrapper = styled.div``
const Comment = styled.div`
  border-bottom: 1px solid ${basicTheme.borderColors.main};
  padding: 1rem;
  .top {
    font-size: 12px;
    color: ${basicTheme.fontColors.sub};
    .username {
      margin-right: 1rem;
    }
  }
  .middle {
    margin-top: 5px;
    margin-bottom: 5px;
    .content {
    }
  }
  .bottom {
    a {
      color: ${basicTheme.fontColors.sub};
      text-decoration: none;
    }
    font-size: 12px;
    .title {
    }
  }
`

export const MyPage: FunctionComponent = () => {
  const { user }: UserContextProps = useContext(UserContext)
  const [activeTab, dispatchActiveTab] = useState('post')

  const [userActivity, dispatchUserActivity] = useState<UserActivity>({
    comments: [],
    posts: []
  })

  const setUserActivity = (initData: any) => {
    dispatchUserActivity(initData)
  }

  useFetch(setUserActivity, `${process.env.REACT_APP_BASE_URL}/my-activity`)

  return user == null ? (
    <div>로그인 후 사용할 수 있는 서비스입니다. </div>
  ) : (
    <MyPageWrapper>
      <UserInfoWrapper>
        <div className="profile">
          <img
            src={user.profile_url !== null ? user.profile_url : '#'}
            alt=""
          />
        </div>
        <div className="username">{user.username}</div>
      </UserInfoWrapper>
      <UserActivityWrapper>
        {userActivity != null ? (
          <>
            <Tabs>
              <TabTitle
                onClick={e => dispatchActiveTab('post')}
                className={`${activeTab === 'post' ? 'active' : null}`}
              >
                내가 쓴 글
              </TabTitle>
              <TabTitle
                onClick={e => dispatchActiveTab('comment')}
                className={`${activeTab === 'comment' ? 'active' : null}`}
              >
                내가 쓴 댓글
              </TabTitle>
            </Tabs>
            <TabContent className={`${activeTab === 'post' ? 'active' : null}`}>
              <Posts>
                {userActivity.posts.map(post => (
                  <PostItemWrapper>
                    <div className="top">
                      <span>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                      </span>
                      <CommentBox>{post.comment_count}</CommentBox>
                    </div>
                    <div className="mid">
                      <span>{user.username} • </span>
                      <span>{post.created_time} • </span>
                      <span>조회 {post.view_count}</span>
                    </div>
                    <div className="bottom">
                      <span>{post.location} • </span>
                      <span>{post.category}</span>
                    </div>
                  </PostItemWrapper>
                ))}
              </Posts>
            </TabContent>
            <TabContent
              className={`${activeTab === 'comment' ? 'active' : null}`}
            >
              <Comments>
                {userActivity.comments.map(comment => (
                  <Comment>
                    <div className="top">
                      <span className="username">{user.username}</span>
                      <span className="date">{comment.created_time}</span>
                    </div>
                    <div className="middle">
                      <div className="content">{comment.content}</div>
                    </div>
                    <div className="bottom">
                      <Link to={`/posts/${comment.post_id}`}>
                        <span>원문: </span>
                        <span className="title">{comment.post_title}</span>
                      </Link>
                    </div>
                  </Comment>
                ))}
              </Comments>
            </TabContent>
          </>
        ) : (
          <div>loading...</div>
        )}
      </UserActivityWrapper>
    </MyPageWrapper>
  )
}
