import { Post } from './Post'
import { Comment } from './Comment'
export interface UserActivity {
  posts: Post[]
  comments: Comment[]
}
