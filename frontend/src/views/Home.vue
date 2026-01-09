<template>
  <div class="relative">
    <!-- 主要内容区域 -->
    <div class="max-w-7xl mx-auto">
      <!-- 轮播图 - 全宽 -->
      <div class="mb-8">
        <Carousel />
      </div>

      <div class="flex gap-8 justify-center">
        <!-- 文章列表区域 -->
        <div class="flex-1 max-w-4xl">
          <!-- 文章列表 -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">最新文章</h2>
              <div class="flex items-center gap-2">
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'btn-view',
                    viewMode === 'grid'
                      ? 'btn-view-active'
                      : ''
                  ]"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'btn-view',
                    viewMode === 'list'
                      ? 'btn-view-active'
                      : ''
                  ]"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 网格布局 - 2列 -->
            <div
              v-if="viewMode === 'grid'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <ArticleCard
                v-for="article in articles"
                :key="article._id"
                :article="article"
                class="animate-slide-up"
              />
            </div>

            <!-- 列表布局 -->
            <div v-else class="space-y-4">
              <div
                v-for="article in articles"
                :key="article._id"
                class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all animate-slide-up"
              >
                <div class="flex gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="px-2 py-1 text-xs rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        {{ article.category }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-500">
                        {{ formatDate(article.createdAt, 'YYYY-MM-DD') }}
                      </span>
                    </div>
                    <router-link :to="`/article/${article._id}`">
                      <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {{ article.title }}
                      </h3>
                    </router-link>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {{ article.summary || article.content.substring(0, 150) + '...' }}
                    </p>
                    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {{ article.views }}
                      </span>
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {{ article.likes }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 加载更多 -->
          <div class="text-center">
            <button class="btn-primary">
              加载更多
            </button>
          </div>
        </div>

        <!-- 侧边栏 -->
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import Sidebar from '@/components/Sidebar.vue'
import Carousel from '@/components/Carousel.vue'
import type { Article } from '@/types'
import { formatDate } from '@/utils'

const viewMode = ref<'grid' | 'list'>('grid')

// 模拟文章数据
const articles = ref<Article[]>([
  {
    _id: '1',
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
  },
  {
    _id: '2',
    title: '升级到 macOS Tahoe 26 没有启动台？用 LaunchNext 实现启动台功能',
    content: 'macOS Tahoe 26 的一个重大更新就是取消了我们平常用的启动台，改成了 app app 来启动 app（这个叫app的app绝了）。',
    summary: 'macOS Tahoe 26 的一个重大更新就是取消了我们平常用的启动台。',
    tags: ['软件', 'Mac'],
    category: '软件推荐',
    author: {
      _id: '1',
      username: '博主',
      email: 'blog@example.com',
      role: 'admin'
    },
    views: 2156,
    likes: 89,
    createdAt: '2025-09-24T00:00:00Z',
    updatedAt: '2025-09-24T00:00:00Z'
  },
  {
    _id: '3',
    title: '如何批量下载抖音某一个博主的全部视频',
    content: '众所周知在Mac上我们通常使用Downie来下载视频。但是如果批量下载的话，使用Downie就有些力不从心了。',
    summary: '众所周知在Mac上我们通常使用Downie来下载视频。',
    tags: ['软件', 'Chrome'],
    category: '软件推荐',
    author: {
      _id: '1',
      username: '博主',
      email: 'blog@example.com',
      role: 'admin'
    },
    views: 1890,
    likes: 76,
    createdAt: '2025-09-22T00:00:00Z',
    updatedAt: '2025-09-22T00:00:00Z'
  },
  {
    _id: '4',
    title: '在 Mac 的 Drawthings 中使用 Qwen Image Edit 打造个人IP形象衍生图',
    content: '之前千问发的Qwen Image Edit还比较火，目前Drawthings终于也是上了这个模型。',
    summary: '之前千问发的Qwen Image Edit还比较火，目前Drawthings终于也是上了这个模型。',
    tags: ['教程', 'AI绘画', 'AIGC'],
    category: '经验分享',
    author: {
      _id: '1',
      username: '博主',
      email: 'blog@example.com',
      role: 'admin'
    },
    views: 1654,
    likes: 92,
    createdAt: '2025-09-19T00:00:00Z',
    updatedAt: '2025-09-19T00:00:00Z'
  },
  {
    _id: '5',
    title: 'AE如何给曲线添加波浪动态效果，动态的波浪线制作',
    content: '如何制作动态的波浪效果呢。创建图层首先用右键单击图层区域创建一个形状图层。',
    summary: '如何制作动态的波浪效果呢。',
    tags: ['教程', 'AfterEffects'],
    category: '经验分享',
    author: {
      _id: '1',
      username: '博主',
      email: 'blog@example.com',
      role: 'admin'
    },
    views: 1423,
    likes: 65,
    createdAt: '2025-09-17T00:00:00Z',
    updatedAt: '2025-09-17T00:00:00Z'
  },
  {
    _id: '6',
    title: 'Vue 3 + TypeScript 最佳实践指南',
    content: '本文将介绍如何在 Vue 3 项目中使用 TypeScript，包括类型定义、组合式 API 的使用等。',
    summary: '本文将介绍如何在 Vue 3 项目中使用 TypeScript。',
    tags: ['教程', '开发', 'Vue'],
    category: '教程',
    author: {
      _id: '1',
      username: '博主',
      email: 'blog@example.com',
      role: 'admin'
    },
    views: 2341,
    likes: 156,
    createdAt: '2025-09-15T00:00:00Z',
    updatedAt: '2025-09-15T00:00:00Z'
  }
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-view {
  @apply p-2 rounded-xl border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:scale-110 active:scale-95;
}

.btn-view-active {
  @apply border-primary-400 dark:border-primary-600 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400;
}

.btn-primary {
  @apply px-6 py-3 bg-primary-600 text-white rounded-xl font-medium relative overflow-hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.6);
  background: linear-gradient(135deg, #0ea5e9, #3b82f6);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
</style>
