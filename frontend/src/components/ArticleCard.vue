<template>
  <article
    class="article-card group"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :style="cardStyle"
  >
    <router-link :to="`/article/${article._id}`" class="block">
      <!-- 文章封面图 -->
      <div
        v-if="article.cover"
        class="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden"
      >
        <img
          :src="article.cover"
          :alt="article.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>
      <div
        v-else
        class="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden"
      >
        <span class="text-white text-4xl font-bold opacity-50 group-hover:scale-110 transition-transform duration-500">{{ article.title.charAt(0) }}</span>
      </div>

      <!-- 文章内容 -->
      <div class="p-6">
        <!-- 分类和标签 -->
        <div class="flex items-center gap-2 mb-3">
          <span class="px-2 py-1 text-xs rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
            {{ article.category }}
          </span>
          <span
            v-for="tag in article.tags.slice(0, 2)"
            :key="tag"
            class="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 标题 -->
        <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {{ article.title }}
        </h2>

        <!-- 摘要 -->
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {{ article.summary || article.content.substring(0, 100) + '...' }}
        </p>

        <!-- 元信息 -->
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <div class="flex items-center gap-4">
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
          <span>{{ formatDate(article.createdAt, 'YYYY-MM-DD') }}</span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Article } from '@/types'
import { formatDate } from '@/utils'

defineProps<{
  article: Article
}>()

const rotateX = ref(0)
const rotateY = ref(0)
const glareX = ref(50)
const glareY = ref(50)

const handleMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  rotateY.value = ((x - centerX) / centerX) * 10
  rotateX.value = ((centerY - y) / centerY) * 10

  glareX.value = (x / rect.width) * 100
  glareY.value = (y / rect.height) * 100
}

const handleMouseLeave = () => {
  rotateX.value = 0
  rotateY.value = 0
  glareX.value = 50
  glareY.value = 50
}

const cardStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
  '--glare-x': `${glareX.value}%`,
  '--glare-y': `${glareY.value}%`
}))
</script>

<style scoped>
.article-card {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
}

.article-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--glare-x) var(--glare-y),
    rgba(255, 255, 255, 0.3),
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 1;
}

.article-card:hover::before {
  opacity: 1;
}

.article-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

