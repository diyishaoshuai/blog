import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../models/User'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// 注册
router.post(
  '/register',
  [
    body('username').isLength({ min: 3, max: 20 }).trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: 400, message: '验证失败', errors: errors.array() })
      }

      const { username, email, password } = req.body

      // 检查用户是否已存在
      const existingUser = await User.findOne({ $or: [{ email }, { username }] })
      if (existingUser) {
        return res.status(400).json({ code: 400, message: '用户名或邮箱已存在' })
      }

      const user = new User({ username, email, password })
      await user.save()

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

      res.status(201).json({
        code: 200,
        message: '注册成功',
        data: {
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        }
      })
    } catch (error: any) {
      res.status(500).json({ code: 500, message: error.message })
    }
  }
)

// 登录
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: 400, message: '验证失败', errors: errors.array() })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ code: 401, message: '邮箱或密码错误' })
      }

      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        return res.status(401).json({ code: 401, message: '邮箱或密码错误' })
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

      res.json({
        code: 200,
        message: '登录成功',
        data: {
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        }
      })
    } catch (error: any) {
      res.status(500).json({ code: 500, message: error.message })
    }
  }
)

export default router

