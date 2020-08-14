import { Post } from '../models/Post'
import { PostDetail } from '../models/PostDetail'

export const postReducer = (
  posts: Post[],
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case 'SET_INIT_DATA':
      return payload
    case 'ADD_DATA':
      return [payload, ...posts.slice(0, -1)]
    case 'DELETE_DATA':
      return payload

    case 'UPDATE_DATA':
      return payload
    default:
      break
  }
}

export const postDetailReducer = (
  post: PostDetail,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case 'SET_INIT_DATA':
      return payload
    case 'ADD_COMMENT':
      return {
        ...post,
        comments: [...post.comments, payload]
      }
    case 'DELETE_COMMENT':
      return {
        ...post,
        comments: payload
      }
    case 'UPDATE_COMMENT':
      return {
        ...post,
        comments: payload
      }
    default:
      break
  }
}

export const userReducer = (
  user: any,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case 'SET_INIT_DATA':
      return payload
    case 'RESET_DATA':
      return null
    default:
      break
  }
}
