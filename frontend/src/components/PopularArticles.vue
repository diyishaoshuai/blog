<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <!-- 标题和切换按钮 -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ mode === 'popular' ? '热门文章' : '随机推荐' }}
      </h3>
      <button
        @click="toggleMode"
        class="text-xs px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {{ mode === 'popular' ? '随机看看' : '热门文章' }}
      </button>
    </div>

    <!-- 文章列表 -->
    <div class="space-y-3">
      <TransitionGroup name="list">
        <div
          v-for="(article, index) in displayArticles"
          :key="article._id"
          class="group cursor-pointer"
        >
          <router-link
            :to="`/article/${article._id}`"
            class="block"
          >
            <div class="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
              <!-- 序号 -->
              <div
                class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs font-bold transition-all duration-300 group-hover:scale-110"
                :class="getIndexClass(index)"
              >
                {{ index + 1 }}
              </div>

              <!-- 文章信息 -->
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium line-clamp-2 mb-1">
                  <span class="text-with-underline text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ article.title }}
                  </span>
                </h4>
                <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {{ article.views }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {{ article.likes }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Article } from '@/types'

interface Props {
  articles: Article[]
}

const props = defineProps<Props>()

const mode = ref<'popular' | 'random'>('popular')

// 热门文章（按浏览量排序）
const popularArticles = computed(() => {
  return [...props.articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
})

// 随机文章
const randomArticles = computed(() => {
  const shuffled = [...props.articles].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 10)
})

// 当前显示的文章列表
const displayArticles = computed(() => {
  return mode.value === 'popular' ? popularArticles.value : randomArticles.value
})

// 切换模式
const toggleMode = () => {
  mode.value = mode.value === 'popular' ? 'random' : 'popular'
}

// 获取序号样式
const getIndexClass = (index: number) => {
  if (index === 0) {
    return 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
  } else if (index === 1) {
    return 'bg-gradient-to-br from-gray-300 to-gray-400 text-white'
  } else if (index === 2) {
    return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
  } else {
    return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 列表过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.list-move {
  transition: transform 0.3s ease;
}

/* 文字下划线从左到右动画 */
.text-with-underline {
  position: relative;
  display: inline;
  background-image: linear-gradient(90deg, #0ea5e9, #3b82f6);
  background-size: 0% 2px;
  background-repeat: no-repeat;
  background-position: 0% 100%;
  transition: background-size 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 2px;
}

.group:hover .text-with-underline {
  background-size: 100% 2px;
}
</style>
