import React, { FunctionComponent, useState, useEffect } from 'react'
import { List } from '../components/post/PostList'
import { useFetch } from '../custom-hook/useFetch'
import { Post } from '../models/Post'
import styled from 'styled-components'

const SearchPostPageWrapper = styled.div``

export interface SearchPostPageProps {
  searchText: string | null
}

export const SearchPostPage: FunctionComponent<SearchPostPageProps> = ({
  searchText
}) => {
  const [posts, dispatchPosts] = useState<Post[]>([])

  const setInitData = (initData: Post[]) => {
    dispatchPosts(initData)
  }

  const loading = useFetch(
    setInitData,
    `${process.env.REACT_APP_BASE_URL}/posts/search?query=${searchText}`
  )

  const options: RequestInit = {
    credentials: 'include'
  }

  const fetchData = async () => {
    const posts = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/search?query=${searchText}`,
      options
    ).then(posts => posts.json())

    dispatchPosts(posts)
  }

  useEffect(() => {
    fetchData()
  }, [searchText])

  return loading ? (
    <div>loading...</div>
  ) : (
    <SearchPostPageWrapper>
      <List posts={posts} loading={loading} />
    </SearchPostPageWrapper>
  )
}
