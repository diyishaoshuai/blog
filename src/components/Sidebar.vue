<template>
  <aside class="hidden lg:block w-80 flex-shrink-0">
    <div class="sticky top-20 space-y-6">
      <!-- 个人介绍 -->
      <ProfileCard />

      <!-- 统计信息 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">统计</h3>
        <div class="grid grid-cols-2 gap-4">
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

      <!-- 热门文章 -->
      <PopularArticles :articles="articles" />

      <!-- 标签 -->
      <TagsSection :tags="allTags" />

      <!-- 友链 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">友情链接</h3>
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
import { ref } from 'vue'
import ProfileCard from './ProfileCard.vue'
import PopularArticles from './PopularArticles.vue'
import TagsSection from './TagsSection.vue'
import type { Article } from '@/types'

const stats = ref({
  articles: 1003,
  days: 2190,
  words: '858.5k',
  comments: 1256
})

// 模拟文章数据（实际应该从父组件传入）
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
