<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <!-- 回到顶部按钮 -->
    <Transition name="fade-slide">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="floating-btn"
        title="回到顶部"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>

    <!-- 主题切换按钮 -->
    <button
      ref="themeButtonRef"
      @click="handleThemeToggle"
      class="floating-btn"
      title="切换主题 (Shift + D)"
    >
      <Transition name="scale" mode="out-in">
        <svg v-if="isDark" key="sun" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else key="moon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'

const showBackToTop = ref(false)
const themeButtonRef = ref<HTMLButtonElement | null>(null)

// 使用主题切换 composable
const { isDark, isTransitioning, overlayPosition, overlayColor, toggleDarkMode, initDarkMode, setupKeyboardShortcut } = useDarkMode()

// 导出给 App.vue 使用（用于圆形扩散动画）
defineExpose({
  isTransitioning,
  overlayPosition,
  overlayColor
})

// 处理主题切换
const handleThemeToggle = () => {
  toggleDarkMode(themeButtonRef.value)
}

// 监听滚动，显示/隐藏回到顶部按钮
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// 平滑滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // 初始化主题
  initDarkMode()

  // 监听滚动
  window.addEventListener('scroll', handleScroll, { passive: true })

  // 设置键盘快捷键
  setupKeyboardShortcut(handleThemeToggle)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.floating-btn {
  @apply w-14 h-14 rounded-full flex items-center justify-center;
  @apply bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300;
  @apply shadow-lg hover:shadow-xl;
  @apply border border-gray-200 dark:border-gray-700;
  @apply transition-all duration-300;
  @apply hover:scale-110 hover:-translate-y-1;
  @apply active:scale-95;
}

.floating-btn:hover {
  @apply text-primary-600 dark:text-primary-400;
  box-shadow: 0 12px 24px rgba(14, 165, 233, 0.3);
}

/* 淡入淡出 + 滑动动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 图标旋转动画 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-90deg);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(90deg);
}
</style>
