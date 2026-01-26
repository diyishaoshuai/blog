<template>
  <aside class="hidden lg:block w-80 flex-shrink-0">
    <!-- 个人介绍 - 不固定 -->
    <ProfileCard />

    <!-- 统计信息 - 不固定 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mt-3">
      <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">统计</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {{ stats.articles }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">文章总数</div>
        </div>
        <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {{ stats.days }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">建站天数</div>
        </div>
        <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {{ stats.words }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">全站字数</div>
        </div>
        <div class="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
            {{ stats.comments }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">评论总数</div>
        </div>
      </div>
    </div>

    <!-- Sticky容器 - 从热门文章开始固定 -->
    <div ref="stickyContainer" class="max-h-[calc(100vh-6rem)] overflow-y-auto mt-3">
      <!-- 热门文章 -->
      <PopularArticles :articles="articles" />

      <!-- 标签 -->
      <TagsSection :tags="allTags" class="mt-3" />

      <!-- 友链 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mt-3">
        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">友情链接</h3>
        <div class="space-y-2 text-sm">
          <a
            v-for="link in friendLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="block text-primary-600 dark:text-primary-400 hover:underline transition-all hover:translate-x-1"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ProfileCard from './ProfileCard.vue'
import PopularArticles from './PopularArticles.vue'
import TagsSection from './TagsSection.vue'
import type { Article } from '@/types'

const stickyContainer = ref<HTMLElement | null>(null)
const topOffset = 80 // 对应 top-20 (5rem = 80px)
let initialTop = 0 // 保存sticky容器的初始位置

const handleScroll = () => {
  if (!stickyContainer.value) return

  const scrollY = window.scrollY
  const containerRect = stickyContainer.value.getBoundingClientRect()
  const asideElement = stickyContainer.value.parentElement

  if (!asideElement) return

  // 获取最后一篇文章（第10篇）
  const articles = document.querySelectorAll('.flex-1 article')
  if (articles.length === 0) return

  const lastArticle = articles[articles.length - 1]
  const lastArticleRect = lastArticle.getBoundingClientRect()
  const lastArticleBottom = lastArticleRect.bottom

  // 判断是否应该开始粘住（当滚动到容器初始位置 - topOffset时）
  const shouldStick = scrollY >= initialTop - topOffset

  if (!shouldStick) {
    // 初始状态，自然滚动
    stickyContainer.value.style.position = 'static'
    stickyContainer.value.style.top = ''
    stickyContainer.value.style.width = ''
    return
  }

  // 获取容器的margin-top（mt-3 = 12px）
  const computedStyle = window.getComputedStyle(stickyContainer.value)
  const marginTop = parseFloat(computedStyle.marginTop) || 0

  // 计算目标top位置（让底部对齐文章底部）
  // 需要减去margin-top，因为fixed定位的top不包括margin
  const targetTop = lastArticleBottom - containerRect.height - marginTop

  // 使用Math.max确保top不会小于topOffset（不会超出顶部边界）
  // 但只在targetTop接近topOffset时才限制，否则允许向上移动以对齐底部
  const finalTop = targetTop >= topOffset ? topOffset : targetTop

  stickyContainer.value.style.position = 'fixed'
  stickyContainer.value.style.top = `${finalTop}px`
  stickyContainer.value.style.width = '320px'
}

onMounted(() => {
  if (stickyContainer.value) {
    // 保存sticky容器的初始位置（相对于页面顶部）
    const rect = stickyContainer.value.getBoundingClientRect()
    initialTop = rect.top + window.scrollY
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  handleScroll() // 初始调用
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})

const stats = ref({
  articles: 1003,
  days: 2190,
  words: '858.5k',
  comments: 1256
})

const articles = ref<Article[]>([
  {
    _id: '1',
    title: '我在2026年推荐的Mac软件',
    content: '',
    summary: '',
    tags: ['软件', 'Mac'],
    category: '软件推荐',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 3382,
    likes: 128,
    createdAt: '2025-10-02T00:00:00Z',
    updatedAt: '2025-10-02T00:00:00Z'
  },
  {
    _id: '2',
    title: '升级到 macOS Tahoe 26 没有启动台？',
    content: '',
    summary: '',
    tags: ['软件', 'Mac'],
    category: '软件推荐',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 2156,
    likes: 89,
    createdAt: '2025-09-24T00:00:00Z',
    updatedAt: '2025-09-24T00:00:00Z'
  },
  {
    _id: '3',
    title: 'Vue 3 Composition API 完全指南',
    content: '',
    summary: '',
    tags: ['Vue', '教程'],
    category: '前端开发',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 2845,
    likes: 156,
    createdAt: '2025-09-15T00:00:00Z',
    updatedAt: '2025-09-15T00:00:00Z'
  },
  {
    _id: '4',
    title: 'TypeScript 高级类型技巧',
    content: '',
    summary: '',
    tags: ['TypeScript', '开发'],
    category: '前端开发',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 1987,
    likes: 92,
    createdAt: '2025-09-08T00:00:00Z',
    updatedAt: '2025-09-08T00:00:00Z'
  },
  {
    _id: '5',
    title: 'Tailwind CSS 实战技巧分享',
    content: '',
    summary: '',
    tags: ['CSS', '设计'],
    category: '前端开发',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 2634,
    likes: 118,
    createdAt: '2025-08-28T00:00:00Z',
    updatedAt: '2025-08-28T00:00:00Z'
  },
  {
    _id: '6',
    title: 'React Hooks 最佳实践',
    content: '',
    summary: '',
    tags: ['React', '教程'],
    category: '前端开发',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 2198,
    likes: 105,
    createdAt: '2025-08-20T00:00:00Z',
    updatedAt: '2025-08-20T00:00:00Z'
  },
  {
    _id: '7',
    title: 'Node.js 性能优化指南',
    content: '',
    summary: '',
    tags: ['Node.js', '干货'],
    category: '后端开发',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 1876,
    likes: 87,
    createdAt: '2025-08-12T00:00:00Z',
    updatedAt: '2025-08-12T00:00:00Z'
  },
  {
    _id: '8',
    title: 'Git 工作流最佳实践',
    content: '',
    summary: '',
    tags: ['Git', '开发'],
    category: '工具使用',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 2456,
    likes: 132,
    createdAt: '2025-08-05T00:00:00Z',
    updatedAt: '2025-08-05T00:00:00Z'
  },
  {
    _id: '9',
    title: 'Docker 容器化部署实战',
    content: '',
    summary: '',
    tags: ['Docker', '运维'],
    category: '运维部署',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 1765,
    likes: 78,
    createdAt: '2025-07-28T00:00:00Z',
    updatedAt: '2025-07-28T00:00:00Z'
  },
  {
    _id: '10',
    title: 'MongoDB 数据库设计模式',
    content: '',
    summary: '',
    tags: ['MongoDB', '数据库'],
    category: '后端开发',
    author: { _id: '1', username: '博主', email: 'blog@example.com', role: 'admin' },
    views: 1543,
    likes: 65,
    createdAt: '2025-07-20T00:00:00Z',
    updatedAt: '2025-07-20T00:00:00Z'
  }
])

const allTags = ref([
  { name: '教程', count: 408 },
  { name: '设计', count: 271 },
  { name: '开发', count: 238 },
  { name: '干货', count: 175 },
  { name: 'Swift', count: 126 },
  { name: '软件', count: 124 },
  { name: '日常', count: 105 },
  { name: 'Mac', count: 94 },
  { name: 'Vue', count: 87 },
  { name: 'React', count: 76 }
])

const friendLinks = ref([
  { name: '草东日记', url: '#' },
  { name: 'webfem', url: '#' },
  { name: '山海资源库', url: '#' }
])
</script>

<style scoped>
/* 样式已移至各个组件内部 */
</style>
