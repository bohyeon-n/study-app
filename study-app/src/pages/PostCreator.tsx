import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { SelectBox } from '../style-components/selectBox/SelectBox'
import { OptionType } from '../style-components/selectBox/OptionType'
import { TextArea } from '../style-components/textArea/TextArea'
import { DefaultButton } from '../style-components/button/DefaultButton'
import { Input } from '../style-components/input/Input'
import { Redirect } from 'react-router-dom'

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

export const PostCreator = () => {
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

  const [toHome, setToHome] = useState(false)
  const [selectedCategory, patchCategory] = useState(options[0].value)
  const [selectedLocation, patchLocation] = useState(locationOptions[0].value)
  const [content, patchContent] = useState('')
  const [title, patchTitle] = useState('')

  const onChangeCategory = (value: string) => {
    patchCategory(value)
  }

  const onChangeLocation = (value: string) => {
    patchLocation(value)
  }

  const onChangeTitle = (value: string) => {
    patchTitle(value)
  }

  const onChangeContent = (value: string) => {
    patchContent(value)
  }

  const onClickCreate = async () => {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        category: selectedCategory,
        location: selectedLocation,
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
          <Input onChange={onChangeTitle} label={'title'} fontSize={14} />
        </div>
      </HeaderWrapper>
      <TextArea
        height={500}
        onChange={onChangeContent}
        label={'content'}
        fontSize={14}
      />
      <Buttons>
        <DefaultButton width={80} boldFont={true} onClick={onClickCreate}>
          등록
        </DefaultButton>
        <DefaultButton width={50}>취소</DefaultButton>
      </Buttons>
    </PostCreatorWrapper>
  )
}
