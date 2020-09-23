import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DefaultButton } from '../style-components/button/DefaultButton'
import { Redirect, useParams } from 'react-router-dom'
import { useFetch } from '../custom-hook/useFetch'
import { PostDetail } from '../models/PostDetail'
import { useInputs } from '../custom-hook/useInputs'
import { PostForm } from '../components/post/PostForm'

const PostCreatorWrapper = styled.div`
  width: 100%;
  max-width: 980px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  button {
    margin-left: 20px;
  }
`

export const PostUpdatePage = () => {
  const { postId } = useParams()
  const [toPostPage, redirectPostPage] = useState(false)
  const [autoFocusElement, setAutoFocusElement] = useState('')

  const [
    { category, location, content, title },
    onChange,
    onChangeContent,
    setAllValue
  ] = useInputs({
    category: '',
    location: '',
    content: '',
    title: ''
  })

  const onClickUpdate = async () => {
    if (content === '') {
      setAutoFocusElement('content')
      setTimeout(() => {
        setAutoFocusElement('')
      }, 0)
      return
    }

    if (title === '') {
      setAutoFocusElement('title')
      setTimeout(() => {
        setAutoFocusElement('')
      }, 0)
      return
    }
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        category: category,
        location: location,
        title: title,
        content: content
      })
    }

    await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
      requestOptions
    ).then(response => response.json())

    redirectPostPage(true)
  }

  useFetch((data: PostDetail) => {
    setAllValue({
      category: data.category !== null ? data.category : '',
      location: data.location !== null ? data.location : '',
      content: data.content !== null ? data.content : '',
      title: data.title !== null ? data.title : ''
    })
  }, `${process.env.REACT_APP_BASE_URL}/posts/${postId}`)

  return toPostPage ? (
    <Redirect to={`/posts/${postId}`} />
  ) : (
    <PostCreatorWrapper>
      <PostForm
        onChange={onChange}
        onChangeContent={onChangeContent}
        value={{ content, title, location, category }}
        autoFocusElement={autoFocusElement}
        setAutoFocusElement={setAutoFocusElement}
      />
      <Buttons>
        <DefaultButton width={80} boldFont={true} onClick={onClickUpdate}>
          수정
        </DefaultButton>
        <DefaultButton width={50}>
          <Link to="/">취소</Link>
        </DefaultButton>
      </Buttons>
    </PostCreatorWrapper>
  )
}
