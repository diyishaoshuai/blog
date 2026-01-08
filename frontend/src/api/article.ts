import request from './request'

export interface Article {
  _id: string
  title: string
  content: string
  summary: string
  tags: string[]
  category: string
  author: string
  views: number
  likes: number
  createdAt: string
  updatedAt: string
}

export const getArticles = (params?: { page?: number; limit?: number; tag?: string; category?: string }) => {
  return request.get<{ articles: Article[]; total: number }>('/articles', { params })
}

export const getArticleById = (id: string) => {
  return request.get<Article>(`/articles/${id}`)
}

export const createArticle = (data: Partial<Article>) => {
  return request.post<Article>('/articles', data)
}

export const updateArticle = (id: string, data: Partial<Article>) => {
  return request.put<Article>(`/articles/${id}`, data)
}

export const deleteArticle = (id: string) => {
  return request.delete(`/articles/${id}`)
}

