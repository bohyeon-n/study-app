import React, { useState } from 'react'
import styled from 'styled-components'
import { DefaultButton } from '../style-components/button/DefaultButton'
import { Redirect } from 'react-router-dom'
import { useInputs } from '../custom-hook/useInputs'
import { categoryOptions, locationOptions } from '../constants/postOptions'
import { PostForm, PostInput } from '../components/post/PostForm'

const PostFormPageWrapper = styled.div`
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

export const PostFormPage = () => {
  const initialFormState = {
    category: categoryOptions[0].value,
    location: locationOptions[0].value,
    content: '',
    title: ''
  }

  const [
    { category, location, content, title },
    onChange,
    onChangeContent
  ] = useInputs(initialFormState)

  const [toHome, setToHome] = useState(false)
  const [autoFocusElement, setAutoFocusElement] = useState('')

  const onClickCreate = async () => {
    if (title === '') {
      setAutoFocusElement(PostInput.title)
      setTimeout(() => {
        setAutoFocusElement('')
      }, 0)
      return
    }
    if (content === '') {
      setAutoFocusElement(PostInput.content)
      setTimeout(() => {
        setAutoFocusElement('')
      }, 0)
      return
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        category: category,
        location: location,
        title: title,
        content: content
      })
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts`,
      requestOptions
    )
    if (response.status === 200) {
      const newPost = await response.json()
    }

    setToHome(true)
  }

  return toHome ? (
    <Redirect to="/" />
  ) : (
    <PostFormPageWrapper>
      <PostForm
        onChange={onChange}
        onChangeContent={onChangeContent}
        value={{ content, title, location, category }}
        autoFocusElement={autoFocusElement}
        setAutoFocusElement={setAutoFocusElement}
      />
      <Buttons>
        <DefaultButton width={80} boldFont={true} onClick={onClickCreate}>
          등록
        </DefaultButton>
        <DefaultButton width={50}>취소</DefaultButton>
      </Buttons>
    </PostFormPageWrapper>
  )
}
