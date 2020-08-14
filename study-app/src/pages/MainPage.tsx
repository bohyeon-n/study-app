import React, { FunctionComponent } from 'react'
import { MainContainer } from '../components/container/MainContainer'
import PostStore from '../stores/PostStore'

export const MainPage: FunctionComponent = () => {
  return (
    <PostStore>
      <MainContainer />
    </PostStore>
  )
}
