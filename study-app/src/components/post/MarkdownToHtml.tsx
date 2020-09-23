import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

export const MarkdownToHtml = ({ source }: string | any) => {
  return <ReactMarkdown source={source} renderers={{ code: CodeBlock }} />
}
