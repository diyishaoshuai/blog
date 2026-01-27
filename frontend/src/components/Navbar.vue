<template>
  <nav class="navbar-glass">
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

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleSearch = () => {
  // 搜索功能待实现
}

// 快捷键监听
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
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
/* 玻璃态导航栏 */
.navbar-glass {
  @apply fixed top-0 left-0 right-0 z-[100] w-full;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .navbar-glass {
  background: rgba(17, 24, 39, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.nav-link {
  @apply text-gray-700 dark:text-gray-300 font-medium relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9, #3b82f6);
  transform: translateX(-50%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  @apply text-primary-600 dark:text-primary-400;
  transform: translateY(-2px);
}

.nav-link:hover::after {
  width: 100%;
}

.btn-icon {
  @apply p-2 rounded-xl relative overflow-hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.1));
}

.btn-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-icon:hover::before {
  width: 200px;
  height: 200px;
}

.btn-icon:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 16px rgba(14, 165, 233, 0.2);
}

.btn-icon:active {
  transform: translateY(0) scale(0.98);
}
</style>

