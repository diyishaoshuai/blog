import express from 'express'
import { body, validationResult } from 'express-validator'
import Article from '../models/Article'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// 获取文章列表
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    const tag = req.query.tag as string
    const category = req.query.category as string

    const query: any = {}
    if (tag) query.tags = tag
    if (category) query.category = category

    const articles = await Article.find(query)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Article.countDocuments(query)

    res.json({
      code: 200,
      message: '获取成功',
      data: {
        articles,
        total,
        page,
        limit
      }
    })
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

// 获取文章详情
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'username avatar')
    
    if (!article) {
      return res.status(404).json({ code: 404, message: '文章不存在' })
    }

    // 增加浏览量
    article.views += 1
    await article.save()

    res.json({
      code: 200,
      message: '获取成功',
      data: article
    })
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

// 创建文章（需要认证）
router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().trim(),
    body('content').notEmpty(),
    body('summary').optional().trim(),
    body('tags').optional().isArray(),
    body('category').optional().trim()
  ],
  async (req: AuthRequest, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: 400, message: '验证失败', errors: errors.array() })
      }

      const article = new Article({
        ...req.body,
        author: req.user?._id || req.body.author
      })
      await article.save()

      res.status(201).json({
        code: 200,
        message: '创建成功',
        data: article
      })
    } catch (error: any) {
      res.status(500).json({ code: 500, message: error.message })
    }
  }
)

// 更新文章（需要认证）
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const article = await Article.findById(req.params.id)
    
    if (!article) {
      return res.status(404).json({ code: 404, message: '文章不存在' })
    }

    // 检查权限（作者或管理员）
    // 这里需要完善权限检查逻辑

    Object.assign(article, req.body)
    await article.save()

    res.json({
      code: 200,
      message: '更新成功',
      data: article
    })
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

// 删除文章（需要认证）
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const article = await Article.findById(req.params.id)
    
    if (!article) {
      return res.status(404).json({ code: 404, message: '文章不存在' })
    }

    // 检查权限（作者或管理员）
    // 这里需要完善权限检查逻辑

    await article.deleteOne()

    res.json({
      code: 200,
      message: '删除成功'
    })
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

export default router

