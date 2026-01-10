<template>
  <nav class="pagination-container" aria-label="分页导航">
    <div class="pagination-wrapper">
      <!-- 上一页按钮 -->
      <button
        @click="goToPrevPage"
        :disabled="currentPage === 1"
        class="pagination-nav-btn prev-btn"
        :class="{ 'disabled': currentPage === 1 }"
        aria-label="上一页"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="nav-text">上一页</span>
      </button>

      <!-- 页码区域 -->
      <div class="pagination-numbers">
        <!-- 第一页 -->
        <button
          v-if="showFirstPage"
          @click="goToPage(1)"
          class="page-number"
          :class="{ 'active': currentPage === 1 }"
        >
          1
        </button>

        <!-- 左侧省略号 -->
        <span v-if="showLeftEllipsis" class="ellipsis">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </span>

        <!-- 中间页码 -->
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="page-number"
          :class="{ 'active': currentPage === page }"
        >
          {{ page }}
        </button>

        <!-- 右侧省略号 -->
        <span v-if="showRightEllipsis" class="ellipsis">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </span>

        <!-- 最后一页 -->
        <button
          v-if="showLastPage"
          @click="goToPage(totalPages)"
          class="page-number"
          :class="{ 'active': currentPage === totalPages }"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- 下一页按钮 -->
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="pagination-nav-btn next-btn"
        :class="{ 'disabled': currentPage === totalPages }"
        aria-label="下一页"
      >
        <span class="nav-text">下一页</span>
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- 跳转输入框 -->
      <div class="jump-to-page">
        <input
          v-model.number="jumpPageInput"
          @keyup.enter="jumpToPage"
          type="number"
          :min="1"
          :max="totalPages"
          placeholder="跳转"
          class="jump-input"
          aria-label="跳转到指定页面"
        />
        <button @click="jumpToPage" class="jump-btn" aria-label="确认跳转">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  visibleRange?: number
}

interface Emits {
  (e: 'update:currentPage', page: number): void
  (e: 'pageChange', page: number): void
}

const props = withDefaults(defineProps<Props>(), {
  visibleRange: 2
})

const emit = defineEmits<Emits>()

const jumpPageInput = ref<number | ''>('')

// 计算可见的页码
const visiblePages = computed(() => {
  const pages: number[] = []
  const range = props.visibleRange
  const current = props.currentPage
  const total = props.totalPages

  let start = Math.max(2, current - range)
  let end = Math.min(total - 1, current + range)

  // 调整范围以保持一致的显示数量
  if (current <= range + 1) {
    end = Math.min(total - 1, range * 2 + 2)
  }
  if (current >= total - range) {
    start = Math.max(2, total - range * 2 - 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// 是否显示第一页
const showFirstPage = computed(() => {
  return props.totalPages > 1
})

// 是否显示最后一页
const showLastPage = computed(() => {
  return props.totalPages > 1 && visiblePages.value[visiblePages.value.length - 1] !== props.totalPages
})

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  return visiblePages.value.length > 0 &&
         visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
})

// 跳转到指定页
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('pageChange', page)
  }
}

// 上一页
const goToPrevPage = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

// 下一页
const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    goToPage(props.currentPage + 1)
  }
}

// 跳转到输入的页码
const jumpToPage = () => {
  if (jumpPageInput.value && jumpPageInput.value >= 1 && jumpPageInput.value <= props.totalPages) {
    goToPage(jumpPageInput.value)
    jumpPageInput.value = ''
  }
}

// 监听当前页变化，滚动到顶部
watch(() => props.currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.pagination-container {
  @apply w-full py-12;
}

.pagination-wrapper {
  @apply flex items-center justify-center gap-3 flex-wrap;
}

/* 导航按钮样式 */
.pagination-nav-btn {
  @apply flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium;
  @apply bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700;
  @apply text-gray-700 dark:text-gray-300;
  @apply transition-all duration-300 ease-out;
  @apply hover:border-primary-400 dark:hover:border-primary-500;
  @apply hover:bg-primary-50 dark:hover:bg-primary-900/20;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply hover:shadow-lg hover:shadow-primary-500/20;
  @apply hover:-translate-y-0.5;
  @apply active:translate-y-0 active:scale-95;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.pagination-nav-btn.disabled {
  @apply opacity-40 cursor-not-allowed;
  @apply hover:border-gray-200 dark:hover:border-gray-700;
  @apply hover:bg-white dark:hover:bg-gray-800;
  @apply hover:text-gray-700 dark:hover:text-gray-300;
  @apply hover:shadow-none hover:translate-y-0;
}

.nav-icon {
  @apply w-5 h-5;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pagination-nav-btn:not(.disabled):hover .nav-icon {
  animation: bounce-horizontal 0.6s ease-in-out;
}

.prev-btn:not(.disabled):hover .nav-icon {
  transform: translateX(-2px);
}

.next-btn:not(.disabled):hover .nav-icon {
  transform: translateX(2px);
}

.nav-text {
  @apply text-sm;
}

/* 页码数字区域 */
.pagination-numbers {
  @apply flex items-center gap-2;
}

/* 页码按钮 */
.page-number {
  @apply w-11 h-11 rounded-xl flex items-center justify-center;
  @apply bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700;
  @apply text-gray-700 dark:text-gray-300 font-semibold text-sm;
  @apply transition-all duration-300 ease-out;
  @apply hover:border-primary-400 dark:hover:border-primary-500;
  @apply hover:bg-primary-50 dark:hover:bg-primary-900/20;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply hover:shadow-lg hover:shadow-primary-500/20;
  @apply hover:-translate-y-1 hover:scale-110;
  @apply active:translate-y-0 active:scale-100;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-variant-numeric: tabular-nums;
}

.page-number.active {
  @apply border-primary-500 dark:border-primary-400;
  @apply bg-gradient-to-br from-primary-500 to-primary-600;
  @apply text-white shadow-xl shadow-primary-500/40;
  @apply scale-110;
  position: relative;
}

.page-number.active::before {
  content: '';
  @apply absolute inset-0 rounded-xl;
  background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

/* 省略号 */
.ellipsis {
  @apply flex items-center gap-1 px-2;
}

.dot {
  @apply w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600;
  animation: pulse-dot 2s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

/* 跳转输入框 */
.jump-to-page {
  @apply flex items-center gap-2 ml-2;
}

.jump-input {
  @apply w-20 h-11 px-3 rounded-xl text-center;
  @apply bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700;
  @apply text-gray-700 dark:text-gray-300 font-semibold text-sm;
  @apply transition-all duration-300;
  @apply focus:outline-none focus:border-primary-500 dark:focus:border-primary-400;
  @apply focus:bg-primary-50 dark:focus:bg-primary-900/20;
  @apply focus:shadow-lg focus:shadow-primary-500/20;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-variant-numeric: tabular-nums;
}

.jump-input::placeholder {
  @apply text-gray-400 dark:text-gray-600 text-xs;
}

/* 移除数字输入框的箭头 */
.jump-input::-webkit-inner-spin-button,
.jump-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jump-input[type=number] {
  -moz-appearance: textfield;
}

.jump-btn {
  @apply w-11 h-11 rounded-xl flex items-center justify-center;
  @apply bg-primary-500 dark:bg-primary-600 border-2 border-primary-500 dark:border-primary-600;
  @apply text-white;
  @apply transition-all duration-300 ease-out;
  @apply hover:bg-primary-600 dark:hover:bg-primary-500;
  @apply hover:shadow-xl hover:shadow-primary-500/40;
  @apply hover:-translate-y-1 hover:scale-110;
  @apply active:translate-y-0 active:scale-100;
}

.jump-btn svg {
  @apply w-5 h-5;
}

/* 动画 */
@keyframes bounce-horizontal {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-4px);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .pagination-wrapper {
    @apply gap-2;
  }

  .pagination-nav-btn {
    @apply px-3 py-2;
  }

  .nav-text {
    @apply hidden;
  }

  .page-number {
    @apply w-9 h-9 text-xs;
  }

  .jump-input {
    @apply w-16 h-9 text-xs;
  }

  .jump-btn {
    @apply w-9 h-9;
  }
}
</style>
