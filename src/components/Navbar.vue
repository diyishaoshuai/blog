<template>
  <nav class="fixed top-0 left-0 right-0 z-[100] w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <router-link to="/" class="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
            博客
          </router-link>
        </div>

        <!-- 导航链接 -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="nav-link"
            active-class="text-primary-600 dark:text-primary-400"
          >
            主页
          </router-link>
          <router-link
            to="/articles"
            class="nav-link"
            active-class="text-primary-600 dark:text-primary-400"
          >
            博客
          </router-link>
          <router-link
            to="/about"
            class="nav-link"
            active-class="text-primary-600 dark:text-primary-400"
          >
            关于
          </router-link>
        </div>

        <!-- 右侧操作 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 -->
          <button
            @click="toggleSearch"
            class="btn-icon"
            title="搜索 (Shift + S)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- 暗黑模式切换 -->
          <button
            ref="themeButtonRef"
            @click="toggleDarkMode"
            class="btn-icon relative"
            title="切换主题 (Shift + D)"
          >
            <Transition name="scale" mode="out-in">
              <svg v-if="isDark" key="sun" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else key="moon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </Transition>
          </button>

          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="btn-icon md:hidden"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
        <router-link
          to="/"
          class="block py-2 nav-link"
          @click="mobileMenuOpen = false"
        >
          主页
        </router-link>
        <router-link
          to="/articles"
          class="block py-2 nav-link"
          @click="mobileMenuOpen = false"
        >
          博客
        </router-link>
        <router-link
          to="/about"
          class="block py-2 nav-link"
          @click="mobileMenuOpen = false"
        >
          关于
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)
const mobileMenuOpen = ref(false)
const themeButtonRef = ref<HTMLButtonElement | null>(null)
const isTransitioning = ref(false)
const overlayPosition = ref({ x: 0, y: 0 })
const overlayColor = ref('')

// 导出给父组件使用
defineExpose({
  isTransitioning,
  overlayPosition,
  overlayColor
})

const toggleDarkMode = () => {
  // 获取按钮位置
  if (themeButtonRef.value) {
    const rect = themeButtonRef.value.getBoundingClientRect()
    overlayPosition.value = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }

  // 固定遮罩层颜色（目标主题的颜色）
  overlayColor.value = isDark.value ? '#f9fafb' : '#111827'

  // 开始动画
  isTransitioning.value = true

  // 等待动画扩散到最大时再切换主题（动画 45% 时间，让切换更自然）
  setTimeout(() => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, 225) // 0.5s 动画的 45%

  // 动画结束后移除遮罩
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleSearch = () => {
  // 搜索功能待实现
  console.log('打开搜索')
}

// 初始化主题
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }

  // 快捷键监听
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key === 'D') {
      e.preventDefault()
      toggleDarkMode()
    }
    if (e.shiftKey && e.key === 'S') {
      e.preventDefault()
      toggleSearch()
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium;
}

.btn-icon {
  @apply p-2 rounded-xl border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:scale-110 active:scale-95;
}

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

