import { PostDetail } from '../models/PostDetail'
import { Comment } from '../models/Comment'

export const SET_INIT_DATA = 'SET_INIT_DATA'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export type PostAction =
  | {
      type: typeof SET_INIT_DATA
      payload: PostDetail
    }
  | {
      type: typeof ADD_COMMENT
      payload: Comment
    }
  | {
      type: typeof DELETE_COMMENT
      payload: number
    }
  | {
      type: typeof UPDATE_COMMENT
      payload: {
        updatedId: number
        newComment: Comment
      }
    }

export interface PostState {
  post: PostDetail
}

export const initialState: PostState = {
  post: {
    author: null,
    category: null,
    comments: [],
    content: null,
    created_time: null,
    id: null,
    location: null,
    title: null,
    view_count: null
  }
}

export const postReducer = (
  state: PostState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case SET_INIT_DATA:
      return {
        post: action.payload
      }

    case ADD_COMMENT:
      return {
        post: {
          ...state.post,
          comments: [...state.post.comments, action.payload]
        }
      }
    case DELETE_COMMENT:
      return {
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment: Comment) => comment.id !== action.payload
          )
        }
      }
    case UPDATE_COMMENT:
      return {
        post: {
          ...state.post,
          comments: state.post.comments.map((comment: Comment) => {
            if (comment.id === action.payload.updatedId) {
              comment = action.payload.newComment
            }
            return comment
          })
        }
      }
    default:
      return initialState
  }
}
