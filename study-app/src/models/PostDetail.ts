import { User } from './User'
import { Comment } from './Comment'
export interface PostDetail {
  author: User
  category: string
  comments: Comment[]
  content: string
  created_time: string
  id: number
  location: string
  title: string
  view_count: number
}
