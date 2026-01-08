import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import { connectDB } from './config/database'
import articleRoutes from './routes/article'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/articles', articleRoutes)

// 404 处理
app.use((req, res) => {
  res.status(404).json({ code: 404, message: 'Not Found' })
})

// 错误处理
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || 'Internal Server Error'
  })
})

// 启动服务器
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

