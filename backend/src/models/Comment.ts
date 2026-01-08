import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
  articleId: mongoose.Types.ObjectId
  content: string
  author: mongoose.Types.ObjectId
  parentId?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new Schema<IComment>(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    }
  },
  {
    timestamps: true
  }
)

commentSchema.index({ articleId: 1, createdAt: -1 })
commentSchema.index({ parentId: 1 })

export default mongoose.model<IComment>('Comment', commentSchema)

