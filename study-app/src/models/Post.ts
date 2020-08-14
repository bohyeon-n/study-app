import { User } from './User'

export interface Posts {
  posts: Post[]
  postCount: number
}
export interface Post {
  id: number
  author: User
  created_time: string
  title: string
  location: string
  category: string
  comment_count: number
  view_count: number
}
