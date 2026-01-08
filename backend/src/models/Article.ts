import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
  title: string
  content: string
  summary: string
  tags: string[]
  category: string
  author: mongoose.Types.ObjectId
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      maxlength: 500
    },
    tags: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      default: '未分类'
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

// 索引
articleSchema.index({ title: 'text', content: 'text' })
articleSchema.index({ author: 1, createdAt: -1 })
articleSchema.index({ tags: 1 })
articleSchema.index({ category: 1 })

export default mongoose.model<IArticle>('Article', articleSchema)

