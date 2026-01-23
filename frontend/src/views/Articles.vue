<template>
  <div class="min-h-screen">
    <div class="container-custom py-20">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">文章列表</h1>

        <!-- 筛选和排序 -->
        <div class="flex flex-wrap gap-4 mb-8">
          <CustomSelect
            v-model="selectedCategory"
            :options="categoryOptions"
          >
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </template>
          </CustomSelect>

          <CustomSelect
            v-model="selectedSort"
            :options="sortOptions"
          >
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </template>
          </CustomSelect>
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
import CustomSelect from '@/components/CustomSelect.vue'
import type { Article } from '@/types'

// 筛选和排序状态
const selectedCategory = ref('all')
const selectedSort = ref('latest')

// 分类选项
const categoryOptions = [
  { label: '全部分类', value: 'all' },
  { label: '软件推荐', value: 'software' },
  { label: '经验分享', value: 'experience' },
  { label: '教程', value: 'tutorial' }
]

// 排序选项
const sortOptions = [
  { label: '最新发布', value: 'latest' },
  { label: '最多浏览', value: 'views' },
  { label: '最多点赞', value: 'likes' }
]

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

