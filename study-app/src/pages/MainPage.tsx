import React, { FunctionComponent } from 'react'
import { MainContainer } from '../components/container/MainContainer'
import PostStore from '../stores/PostListStore'

export const MainPage: FunctionComponent = () => {
  return (
    <PostStore>
      <MainContainer />
    </PostStore>
  )
}
