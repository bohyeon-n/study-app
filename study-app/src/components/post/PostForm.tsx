import React, { useState } from 'react'
import styled from 'styled-components'
import { basicTheme } from '../../styles/basic-theme'
import { Input } from '../../style-components/input/Input'
import { SelectBox } from '../..//style-components/selectBox/SelectBox'
import { TextArea } from '../../style-components/textArea/TextArea'
import { MarkdownToHtml } from '../../components/post/MarkdownToHtml'
import { categoryOptions, locationOptions } from '../../constants/postOptions'
import { Loading } from '../../style-components/loading/Loading'

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

const ImageUploadBtn = styled.div`
  label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: ${basicTheme.fontColors.white};
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: ${basicTheme.bgColors.allow};
    cursor: ponter;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`

const Preview = styled.div`
  min-height: 500px;
  border: 1px solid ${basicTheme.borderColors.dark};
  padding: 0.5rem;
  img {
    max-width: 100%;
  }
`

const Tab = styled.div`
  border-bottom: 1px solid ${basicTheme.borderColors.dark};
  margin-bottom: 10px;
  padding-left: 8px;

  .tab {
    &:focus {
      outline: 0;
    }
    width: 100px;
    height: 34px;
    padding: 8px 16px;
    border: 1px solid ${basicTheme.borderColors.dark};
    margin-bottom: -1px;
    margin-left: -1px;
    border-radius: 6px 6px 0 0;
    background: ${basicTheme.bgColors.hover};
    margin-right: 2px;
    &.active {
      border-bottom: 1px solid #fff;
      background: #fff;
    }
  }
`

const EditTools = styled.div`
  padding: 10px 0;
  display: flex;
  .tool {
    min-width: 30px;
    margin-right: 5px;
    font-weight: bold;
    font-size: 1rem;
    background: #fff;
    border: 1px solid ${basicTheme.borderColors.dark};
    &:hover {
      color: ${basicTheme.fontColors.allow};
    }
  }
`
export interface PostFormValue {
  content: string
  title: string
  location: string
  category: string
}

export interface postFormProps {
  onChange: Function
  value: PostFormValue
  onChangeContent: Function
  autoFocusElement: string
  setAutoFocusElement: Function
}

enum EditTool {
  HEAD
}

export enum PostInput {
  content = 'content',
  title = 'title',
  location = 'location',
  category = 'category'
}

export const PostForm = (postFormState: postFormProps) => {
  const {
    onChange,
    onChangeContent,
    autoFocusElement,
    setAutoFocusElement
  } = postFormState

  const { title, content, location, category } = postFormState.value
  const [loading, setLoading] = useState(false)
  const [isWriteTab, setWriteTab] = useState(true)

  const onClickEditIcon = (tool: EditTool) => {
    switch (tool) {
      case EditTool.HEAD:
        onChangeContent(PostInput.content, content + '\n### ')
        break
      default:
    }

    setAutoFocusElement(PostInput.content)
  }

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.target.files !== null) {
      setLoading(true)
      formData.append('imageFile', e.target.files[0])
      formData.append('name', 'imageFile')
      const requestOptions: RequestInit = {
        method: 'POST',
        credentials: 'include',
        body: formData
      }

      const imageId = await fetch(
        `${process.env.REACT_APP_BASE_URL}/images`,
        requestOptions
      ).then(response => response.json())
      const imgSrc = `${process.env.REACT_APP_BASE_URL}/images/${imageId}`
      onChangeContent(PostInput.content, `${content}\n![](${imgSrc}) \n`)
      setLoading(false)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <HeaderWrapper>
        <div className="selectBox__wrapper">
          <SelectBox
            width={200}
            height={40}
            options={categoryOptions}
            onChange={onChange}
            selectedValue={category}
            fontSize={16}
            name={PostInput.category}
          />
          <SelectBox
            width={200}
            height={40}
            fontSize={16}
            options={locationOptions}
            onChange={onChange}
            selectedValue={location}
            name={PostInput.location}
          />
        </div>
        <div className="input__wrapper">
          <Input
            onChange={(e: any) => {
              setAutoFocusElement(PostInput.title)
              onChange(e)
            }}
            label={PostInput.title}
            fontSize={14}
            autoFocus={autoFocusElement === PostInput.title}
            value={title}
          />
        </div>
      </HeaderWrapper>
      <div className="content-editor">
        <Tab className="content-editor-tab">
          <button
            className={`${isWriteTab ? 'active tab' : 'tab'}`}
            onClick={e => setWriteTab(true)}
          >
            Write
          </button>
          <button
            className={`${!isWriteTab ? 'active tab' : 'tab'}`}
            onClick={e => setWriteTab(false)}
          >
            Preview
          </button>
        </Tab>
        <div className="content-view">
          {isWriteTab ? (
            <div className="write">
              <EditTools className="write-tool">
                <button
                  className="tool"
                  onClick={e => onClickEditIcon(EditTool.HEAD)}
                >
                  H
                </button>

                <ImageUploadBtn className="image-upload">
                  <label htmlFor="image-upload">이미지 업로드</label>
                  <input
                    type="file"
                    id="image-upload"
                    onChange={onUploadImage}
                  />
                </ImageUploadBtn>
              </EditTools>
              <TextArea
                height={500}
                onChange={(e: any) => {
                  setAutoFocusElement(PostInput.content)
                  onChange(e)
                }}
                label={PostInput.content}
                fontSize={14}
                autoFocus={autoFocusElement === PostInput.content}
                value={content}
              />
            </div>
          ) : (
            <Preview>
              <MarkdownToHtml source={content} />
            </Preview>
          )}
        </div>
      </div>
    </>
  )
}
