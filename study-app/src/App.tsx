import React, { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { Post } from './pages/Post'
import { PostCreator } from './pages/PostCreator'
import { PostUpdate } from './pages/PostUpdate'
import { MyPage } from './pages/MyPage'
import UserStore from './stores/UserStore'
import { SearchPostPage } from './pages/SearchPostPage'
import { Layout } from './components/layout/Layout'
import PageStore from './stores/PageStore'
interface SearchPageProps {
  searchText: null | string
  searchPage: boolean
}
function App() {
  const [searchPageState, setSearchPageState] = useState<SearchPageProps>({
    searchText: null,
    searchPage: false
  })

  const handleSearch = (query: string) => {
    setSearchPageState({
      searchText: query,
      searchPage: true
    })
  }

  const getQueryString = () => {
    const QUERY_NAME = 'query'
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(QUERY_NAME)
  }

  let searchText = searchPageState.searchText
  if (searchText === null) {
    searchText = getQueryString()
  }
  console.log(process.env.REACT_APP_BASE_URL)
  return (
    <UserStore>
      <PageStore>
        <Router>
          {searchPageState.searchPage ? (
            <Redirect
              to={{
                pathname: '/posts/search',
                search: `?query=${searchPageState.searchText}`
              }}
            />
          ) : null}
          <Layout handleSearch={handleSearch}>
            <Switch>
              <Route path={`/posts/search`} exact={true}>
                <SearchPostPage searchText={searchText} />
              </Route>
              <Route path={`/posts/new`} exact={true}>
                <PostCreator />
              </Route>
              <Route path={`/posts/:postId`} exact={true}>
                <Post />
              </Route>
              <Route path={`/posts/:postId/update`} exact={true}>
                <PostUpdate />
              </Route>
              <Route path={`/my-page`} exact={true}>
                <MyPage />
              </Route>
              <Route path="/">
                <MainPage />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </PageStore>
    </UserStore>
  )
}

export default App
