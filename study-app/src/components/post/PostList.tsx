import React, { FunctionComponent } from 'react'

import { Item } from './PostItem'
import { Post } from '../../models/Post'

export interface PostListProps {
  posts: Post[]
  loading: boolean
}
export const List: FunctionComponent<PostListProps> = ({ posts, loading }) => {
  return !loading ? (
    <>
      {posts.map((post: Post) => (
        <Item key={post.id} post={post} />
      ))}
    </>
  ) : (
    <div>loading...</div>
  )
}
