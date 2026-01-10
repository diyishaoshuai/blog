<template>
  <div class="min-h-screen">
    <div class="container-custom py-20">
      <article class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
        <!-- 文章头部 -->
        <header class="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {{ article.title }}
          </h1>

          <!-- 元信息 -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(article.createdAt, 'YYYY-MM-DD') }}
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ article.views }} 阅读
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {{ article.likes }} 点赞
            </span>
          </div>

          <!-- 分类和标签 -->
          <div class="flex flex-wrap gap-2 mt-4">
            <span class="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              {{ article.category }}
            </span>
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- 文章内容 -->
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-lg leading-relaxed">{{ article.content }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Article } from '@/types'
import { formatDate } from '@/utils'

const route = useRoute()
const articleId = route.params.id

// 模拟文章数据
const article = ref<Article>({
  _id: articleId as string,
  title: '我在2026年推荐的Mac软件',
  content: '又到了新的一年啦，这一年，Mac依旧是我最重要的生产力工具。那么这个文章主要就跟大家说说我正在使用的mac软件，互相交流和分享，让自己的生活和工作更有效率，更舒适~',
  summary: '又到了新的一年啦，这一年，Mac依旧是我最重要的生产力工具。',
  tags: ['软件', 'Mac', '推荐'],
  category: '软件推荐',
  author: {
    _id: '1',
    username: '博主',
    email: 'blog@example.com',
    role: 'admin'
  },
  views: 3382,
  likes: 128,
  createdAt: '2025-10-02T00:00:00Z',
  updatedAt: '2025-10-02T00:00:00Z'
})
</script>

