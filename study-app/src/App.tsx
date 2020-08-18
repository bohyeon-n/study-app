import React, { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { PostPage } from './pages/PostPage'
import { PostFormPage } from './pages/PostCreatePage'
import { PostUpdatePage } from './pages/PostUpdatePage'
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
                <PostFormPage />
              </Route>
              <Route path={`/posts/:postId`} exact={true}>
                <PostPage />
              </Route>
              <Route path={`/posts/:postId/update`} exact={true}>
                <PostUpdatePage />
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
