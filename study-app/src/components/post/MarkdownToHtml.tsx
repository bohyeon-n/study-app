import React from 'react'
import ReactMarkdown from 'react-markdown'

export const MarkdownToHtml = ({ source }: string | any) => {
  return <ReactMarkdown source={source} />
}
