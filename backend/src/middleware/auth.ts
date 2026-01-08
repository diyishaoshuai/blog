import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IUser } from '../models/User'

export interface AuthRequest extends Request {
  user?: IUser
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      res.status(401).json({ code: 401, message: '未提供认证令牌' })
      return
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    // 这里可以进一步查询用户信息并附加到 req.user
    next()
  } catch (error) {
    res.status(401).json({ code: 401, message: '无效的认证令牌' })
  }
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    // 这里需要从 req.user 获取用户角色
    // 暂时跳过，后续完善
    next()
  }
}

