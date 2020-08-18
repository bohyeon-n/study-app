import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import {
  DefaultButton,
  AlertButton
} from '../../style-components/button/DefaultButton'
import { Link, useParams, Redirect } from 'react-router-dom'
import { UserContext } from '../../stores/UserStore'
import { PostContext, PostContextProps } from '../../stores/PostStore'

const PostNavigationWrapper = styled.div`
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
`

export const PostNavigation = () => {
  const { postId } = useParams()

  const { user } = useContext(UserContext)
  const { post }: PostContextProps = useContext(PostContext)
  const [toHome, redirectHome] = useState(false)

  const isAuthorUser = user && post && post.author && user.id === post.author.id

  const onClickDelete = async () => {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
      requestOptions
    )

    if (response.status === 200) {
    }

    redirectHome(true)
  }

  return toHome ? (
    <Redirect to={'/'} />
  ) : (
    <PostNavigationWrapper>
      <Link to="/">
        <DefaultButton width={53} height={34}>
          목록
        </DefaultButton>
      </Link>
      {isAuthorUser && (
        <div>
          <DefaultButton width={53} height={34}>
            <Link to={`/posts/${post.id}/update`}>수정</Link>
          </DefaultButton>
          <AlertButton width={53} height={34}>
            <div onClick={onClickDelete}>삭제</div>
          </AlertButton>
        </div>
      )}
    </PostNavigationWrapper>
  )
}
