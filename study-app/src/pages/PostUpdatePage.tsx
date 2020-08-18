import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SelectBox } from '../style-components/selectBox/SelectBox'
import { TextArea } from '../style-components/textArea/TextArea'
import { DefaultButton } from '../style-components/button/DefaultButton'
import { Input } from '../style-components/input/Input'
import { Redirect, useParams } from 'react-router-dom'
import { useFetch } from '../custom-hook/useFetch'
import { PostDetail } from '../models/PostDetail'
import { categoryOptions, locationOptions } from '../constants/postOptions'
import { useInputs } from '../custom-hook/useInputs'

const HeaderWrapper = styled.div`
  .selectBox__wrapper {
    display: flex;
    div {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .input__wrapper {
    margin-bottom: 25px;
  }
`

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

  const [{ category, location, content, title }, onChange, reset] = useInputs({
    category: '',
    location: '',
    content: '',
    title: ''
  })

  const onClickUpdate = async () => {
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
    reset({
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
      <HeaderWrapper>
        <div className="selectBox__wrapper">
          <SelectBox
            width={200}
            height={40}
            options={categoryOptions}
            onChange={onChange}
            selectedValue={category}
            fontSize={16}
            name={'category'}
          />
          <SelectBox
            width={200}
            height={40}
            fontSize={16}
            options={locationOptions}
            onChange={onChange}
            selectedValue={location}
            name={'location'}
          />
        </div>
        <div className="input__wrapper">
          <Input
            onChange={onChange}
            label={'title'}
            fontSize={14}
            defaultContent={title}
          />
        </div>
      </HeaderWrapper>
      <TextArea
        height={500}
        onChange={onChange}
        label={'content'}
        fontSize={14}
        defaultContent={content}
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
