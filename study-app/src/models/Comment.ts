import { User } from './User'

export interface Comment {
  id: number
  author: User
  content: string
  created_time: string
  post_id: number
  post_title: string
}
