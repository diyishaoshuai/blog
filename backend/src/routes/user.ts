import express from 'express'
import User from '../models/User'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// 获取用户信息
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    
    if (!user) {
      return res.status(404).json({ code: 404, message: '用户不存在' })
    }

    res.json({
      code: 200,
      message: '获取成功',
      data: user
    })
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

// 更新用户信息（需要认证）
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.params.id)
    
    if (!user) {
      return res.status(404).json({ code: 404, message: '用户不存在' })
    }

    // 检查权限
    // 这里需要完善权限检查逻辑

    Object.assign(user, req.body)
    await user.save()

    res.json({
      code: 200,
      message: '更新成功',
      data: user
    })
  } catch (error: any) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

export default router

