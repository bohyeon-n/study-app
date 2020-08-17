import { User } from './User'
import { Comment } from './Comment'
export interface PostDetail {
  author: User | null
  category: string | null
  comments: Comment[]
  content: string | null
  created_time: string | null
  id: number | null
  location: string | null
  title: string | null
  view_count: number | null
}
