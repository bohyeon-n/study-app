import React, { FunctionComponent, useState, useEffect } from 'react'

export const PageContext = React.createContext<any | undefined>(undefined)

export interface Page {
  currentPage: number
  totalPost: number
}

const PageStore: FunctionComponent = ({ children }) => {
  const [page, setPage] = useState<Page>({
    currentPage: 1,
    totalPost: 0
  })

  const handleSetPage = (pageNumber: number) => [
    setPage({
      ...page,
      currentPage: pageNumber
    })
  ]

  const handleSetTotalPost = (totalPost: number) => {
    setPage({
      ...page,
      totalPost: totalPost
    })
  }

  const { totalPost, currentPage } = page

  return (
    <PageContext.Provider
      value={{
        currentPage,
        totalPost,
        handleSetPage,
        handleSetTotalPost
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export default PageStore
