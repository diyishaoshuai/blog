# 个人博客网站

一个基于 Vue 3 + MongoDB 的现代化个人博客系统，采用前沿技术栈，注重实用性与视觉体验。

## 🚀 技术栈

### 前端 (Frontend)
- **Vue 3** - 渐进式 JavaScript 框架，使用 Composition API
- **Vite** - 下一代前端构建工具，极速热更新
- **TypeScript** - 类型安全的 JavaScript 超集
- **Pinia** - Vue 官方推荐的状态管理库（替代 Vuex）
- **Vue Router** - 官方路由管理器
- **Tailwind CSS** - 实用优先的 CSS 框架，快速构建炫酷 UI
- **VueUse** - Vue Composition API 工具集合
- **Marked** - Markdown 解析器
- **Shiki** - 代码高亮
- **Axios** - HTTP 客户端
- **Day.js** - 日期处理库
- **阿里巴巴图标库** - 图标字体

### 后端 (Backend)
- **Node.js** - JavaScript 运行时
- **Express** - Web 框架
- **TypeScript** - 类型安全
- **MongoDB** - NoSQL 文档数据库
- **Mongoose** - MongoDB 对象建模工具
- **JWT** - 身份认证
- **bcryptjs** - 密码加密
- **Express Validator** - 数据验证
- **Multer** - 文件上传处理
- **Helmet** - 安全中间件
- **CORS** - 跨域资源共享
- **Compression** - 响应压缩

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **pnpm** - 高效的包管理器
- **tsx** - TypeScript 执行工具

## 📁 项目结构

```
blog/
├── frontend/              # 前端项目
│   ├── src/
│   │   ├── assets/        # 静态资源（CSS、图标等）
│   │   ├── components/    # 组件
│   │   │   ├── ArticleCard.vue      # 文章卡片
│   │   │   ├── Carousel.vue         # 轮播图
│   │   │   ├── Footer.vue            # 页脚
│   │   │   ├── Navbar.vue           # 导航栏
│   │   │   ├── PopularArticles.vue  # 热门文章
│   │   │   ├── ProfileCard.vue     # 个人介绍卡片
│   │   │   ├── Sidebar.vue          # 侧边栏
│   │   │   ├── TagCloudCard.vue    # 标签云卡片
│   │   │   └── TagsSection.vue     # 标签区域
│   │   ├── views/         # 页面视图
│   │   │   ├── Home.vue            # 首页
│   │   │   ├── Articles.vue        # 文章列表
│   │   │   ├── ArticleDetail.vue  # 文章详情
│   │   │   └── About.vue          # 关于页面
│   │   ├── router/        # 路由配置
│   │   ├── stores/        # Pinia 状态管理
│   │   ├── composables/   # 组合式函数
│   │   ├── utils/         # 工具函数
│   │   ├── types/         # TypeScript 类型定义
│   │   ├── api/           # API 接口
│   │   └── App.vue
│   ├── public/            # 公共资源
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # 后端项目
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── models/        # 数据模型
│   │   │   ├── User.ts       # 用户模型
│   │   │   ├── Article.ts    # 文章模型
│   │   │   └── Comment.ts    # 评论模型
│   │   ├── routes/        # 路由
│   │   │   ├── auth.ts       # 认证路由
│   │   │   ├── article.ts    # 文章路由
│   │   │   └── user.ts       # 用户路由
│   │   ├── middleware/   # 中间件
│   │   │   └── auth.ts       # 认证中间件
│   │   ├── utils/         # 工具函数
│   │   ├── types/         # TypeScript 类型定义
│   │   ├── config/        # 配置文件
│   │   │   └── database.ts  # 数据库配置
│   │   └── app.ts         # 应用入口
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example        # 环境变量示例
│
└── README.md
```

## 🎨 功能特性

### 核心功能
- ✅ 文章发布与管理（Markdown 支持）
- ✅ 文章分类与标签
- ✅ 用户认证与授权（JWT）
- ✅ 响应式设计（移动端适配）
- ✅ 文章搜索
- ✅ 文章归档

### 炫酷特性
- ✨ 流畅的页面过渡动画
- ✨ 暗黑模式支持（带扩散动画效果）
- ✨ 轮播图展示推荐内容
- ✨ 卡片式标签云
- ✨ 文章封面图悬停放大效果
- ✨ 按钮交互动画
- ✨ 个人介绍卡片（头像悬停显示关于信息）
- ✨ 统计信息展示

## 🛠️ 开发指南

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MongoDB >= 6.0.0

### 环境配置

后端需要配置环境变量，复制 `backend/env.example` 为 `backend/.env` 并修改相应配置：

```bash
cd backend
copy env.example .env
# 然后编辑 .env 文件，配置 MongoDB 连接和 JWT 密钥
```

环境变量配置示例：
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:5173
```

### 安装依赖

```bash
# 安装前端依赖
cd frontend
pnpm install

# 安装后端依赖
cd ../backend
pnpm install
```

### 开发运行

```bash
# 启动前端开发服务器（默认端口 5173）
cd frontend
pnpm dev

# 启动后端开发服务器（默认端口 3000）
cd backend
pnpm dev
```

### 构建部署

```bash
# 构建前端
cd frontend
pnpm build

# 构建后端
cd backend
pnpm build
pnpm start
```

## 📝 项目进度

### 已完成 ✅
- [x] 初始化前端项目（Vue 3 + Vite + TypeScript）
- [x] 初始化后端项目（Node.js + Express + TypeScript）
- [x] 配置 MongoDB 连接
- [x] 实现用户认证系统（基础框架）
- [x] 实现文章 CRUD 功能（基础框架）
- [x] 实现前端 UI 界面
- [x] 实现首页布局（轮播图、文章列表、侧边栏）
- [x] 实现个人介绍卡片
- [x] 实现标签云展示
- [x] 实现暗黑模式切换（带动画效果）
- [x] 实现响应式设计

### 待完成 📋
- [ ] 添加 Markdown 编辑器
- [ ] 实现评论系统
- [ ] 实现文章搜索功能
- [ ] 优化 SEO
- [ ] 部署到云服务器

## 🎯 主要特性说明

### 主题切换动画
- 使用圆形扩散动画实现主题切换
- 从按钮位置开始扩散，覆盖整个页面
- 动画时长 0.5 秒，使用流畅的缓动函数

### 响应式设计
- 移动端适配
- 侧边栏在移动端自动隐藏
- 文章列表支持网格和列表两种视图

### 性能优化
- 使用 Vite 进行快速构建
- 代码分割和懒加载
- 图片优化和懒加载

## 📄 许可证

MIT License

## 👤 作者

第一少帅 (First General)

## 🔗 相关链接

- GitHub: [diyishaoshuai/blog](https://github.com/diyishaoshuai/blog)
