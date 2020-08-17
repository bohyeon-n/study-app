import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SelectBox } from '../style-components/selectBox/SelectBox'
import { OptionType } from '../style-components/selectBox/OptionType'
import { TextArea } from '../style-components/textArea/TextArea'
import { DefaultButton } from '../style-components/button/DefaultButton'
import { Input } from '../style-components/input/Input'
import { Redirect, useParams } from 'react-router-dom'
import { useFetch } from '../custom-hook/useFetch'
import { PostDetail } from '../models/PostDetail'
import { PostContextProps, PostContext } from '../stores/PostDetailStore'

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

export const PostUpdate = () => {
  const options: OptionType<string>[] = [
    { label: 'java', value: 'java' },
    { label: 'javascript', value: 'javascript' },
    { label: 'haha', value: 'haha' },
    { label: 'hoho', value: 'hoho' }
  ]

  const locationOptions: OptionType<string>[] = [
    { label: '충남', value: '충남' },
    { label: '경기', value: '경기' },
    { label: '서울', value: '서울' },
    { label: '부산', value: '부산' },
    { label: '광주', value: '광주' },
    { label: '강원도', value: '강원도' }
  ]

  const { postId } = useParams()
  const [toPostPage, redirectPostPage] = useState(false)
  const [selectedCategory, updateCategory] = useState(options[0].value)
  const [selectedLocation, updateLocation] = useState(locationOptions[0].value)
  const [content, updateContent] = useState('')
  const [title, updateTitle] = useState('')

  const onChangeCategory = (value: string) => {
    updateCategory(value)
  }

  const onChangeLocation = (value: string) => {
    updateLocation(value)
  }

  const onChangeTitle = (value: string) => {
    updateTitle(value)
  }

  const onChangeContent = (value: string) => {
    updateContent(value)
  }

  const onClickUpdate = async () => {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        category: selectedCategory,
        location: selectedLocation,
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
    updateCategory(data.category !== null ? data.category : '')
    updateLocation(data.location !== null ? data.location : '')
    updateContent(data.content !== null ? data.content : '')
    updateTitle(data.title !== null ? data.title : '')
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
            options={options}
            onChange={onChangeCategory}
            selectedValue={selectedCategory}
            fontSize={16}
          />
          <SelectBox
            width={200}
            height={40}
            fontSize={16}
            options={locationOptions}
            onChange={onChangeLocation}
            selectedValue={selectedLocation}
          />
        </div>
        <div className="input__wrapper">
          <Input
            onChange={onChangeTitle}
            label={'title'}
            fontSize={14}
            defaultContent={title}
          />
        </div>
      </HeaderWrapper>
      <TextArea
        height={500}
        onChange={onChangeContent}
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
