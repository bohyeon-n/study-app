import React, { useState } from 'react'
import styled from 'styled-components'
import { SelectBox } from '../style-components/selectBox/SelectBox'
import { TextArea } from '../style-components/textArea/TextArea'
import { DefaultButton } from '../style-components/button/DefaultButton'
import { Input } from '../style-components/input/Input'
import { Redirect } from 'react-router-dom'
import { useInputs } from '../custom-hook/useInputs'
import { categoryOptions, locationOptions } from '../constants/postOptions'

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

  const [toHome, setToHome] = useState(false)

  const [{ category, location, content, title }, onChange, reset] = useInputs(
    initialFormState
  )
  const [autoFocusElement, setAutoFocusElement] = useState('')

  const onClickCreate = async () => {
    if (title === '') {
      setAutoFocusElement('title')
      setTimeout(() => {
        setAutoFocusElement('')
      }, 0)
      return
    }
    if (content === '') {
      setAutoFocusElement('content')
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
  console.log(autoFocusElement)
  return toHome ? (
    <Redirect to="/" />
  ) : (
    <PostFormPageWrapper>
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
            autoFocus={autoFocusElement === 'title'}
          />
        </div>
      </HeaderWrapper>
      <TextArea
        height={500}
        onChange={onChange}
        label={'content'}
        fontSize={14}
        autoFocus={autoFocusElement === 'content'}
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
