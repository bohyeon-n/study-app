import React, { useState, useContext, FunctionComponent } from 'react'
import { PostContext } from '../../stores/PostStore'
import { List } from '../post/PostList'
import styled from 'styled-components'
import { DefaultButton } from '../../style-components/button/DefaultButton'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../stores/UserStore'
import { Pagingation } from '../../style-components/page/Pagination'
import { device } from '../../styles/device'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  position: relative;
`

const MainBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
  button {
    margin-left: 35px;
    @media ${device.mobileS} {
      margin-left: 5px;
    }
  }
`

export const MainContainer: FunctionComponent = () => {
  const { user, dispatch } = useContext(UserContext)
  const {
    posts,
    loading,
    handleSetPage,
    currentPage,
    totalPost,
    PAGE_SIZE
  } = useContext(PostContext)

  const [createPostPage, dispatchRedirectToPost] = useState(false)

  const redirectPostPage = () => {
    if (user) {
      dispatchRedirectToPost(true)
      return
    }
    alert('로그인이 필요한 서비스입니다!')
  }

  const onClickPage = (n: number) => {
    const maxPage = Math.ceil(totalPost / PAGE_SIZE)
    if (n > maxPage || n <= 0) {
      return
    }
    handleSetPage(n)
  }

  return !loading ? (
    <Container>
      <List posts={posts} loading={loading} />
      <MainBottom>
        <Pagingation
          handleClickPage={onClickPage}
          currentPage={currentPage}
          totalPage={Math.ceil(totalPost / PAGE_SIZE)}
        />
        {!createPostPage ? (
          <DefaultButton width={65} height={34} onClick={redirectPostPage}>
            글쓰기
          </DefaultButton>
        ) : (
          <Redirect push to={'/posts/new'} />
        )}
      </MainBottom>
    </Container>
  ) : (
    <div>..loading</div>
  )
}
