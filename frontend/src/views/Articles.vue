<template>
  <div class="min-h-screen">
    <div class="container-custom py-20">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">文章列表</h1>

        <!-- 筛选和排序 -->
        <div class="flex flex-wrap gap-4 mb-8">
          <select class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option>全部分类</option>
            <option>软件推荐</option>
            <option>经验分享</option>
            <option>教程</option>
          </select>
          <select class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option>最新发布</option>
            <option>最多浏览</option>
            <option>最多点赞</option>
          </select>
        </div>

        <!-- 文章网格 -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ArticleCard
            v-for="article in articles"
            :key="article._id"
            :article="article"
          />
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-12 gap-2">
          <button class="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
            上一页
          </button>
          <button class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            1
          </button>
          <button class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            2
          </button>
          <button class="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import type { Article } from '@/types'

// 模拟文章数据
const articles = ref<Article[]>([
  {
    _id: '1',
    title: '我在2026年推荐的Mac软件',
    content: '又到了新的一年啦，这一年，Mac依旧是我最重要的生产力工具。',
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
  }
])
</script>

