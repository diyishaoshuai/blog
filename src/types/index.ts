export interface User {
  _id: string
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface Article {
  _id: string
  title: string
  content: string
  summary: string
  tags: string[]
  category: string
  author: User
  views: number
  likes: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  articleId: string
  content: string
  author: User
  parentId?: string
  replies?: Comment[]
  createdAt: string
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

