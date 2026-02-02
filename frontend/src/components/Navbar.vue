<template>
  <nav :class="transparent ? 'navbar-transparent' : 'navbar-glass'">
    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo with enhanced styling -->
        <div class="flex items-center space-x-3 logo-container">
          <router-link to="/" class="logo-link group">
            <span class="logo-text">博客</span>
            <div class="logo-underline"></div>
          </router-link>
        </div>

        <!-- 中心区域：导航链接或滚动标题 -->
        <div class="flex-1 flex justify-center nav-center">
          <Transition name="fade-slide" mode="out-in">
            <!-- 显示导航链接（在顶部时） -->
            <div v-if="!showScrollTitle" key="nav-links" class="hidden md:flex items-center gap-8">
              <router-link
                to="/"
                class="nav-link group"
                active-class="nav-link-active"
              >
                <span class="nav-link-text">主页</span>
                <span class="nav-link-indicator"></span>
              </router-link>
              <router-link
                to="/articles"
                class="nav-link group"
                active-class="nav-link-active"
              >
                <span class="nav-link-text">文库</span>
                <span class="nav-link-indicator"></span>
              </router-link>
              <router-link
                to="/projects"
                class="nav-link group"
                active-class="nav-link-active"
              >
                <span class="nav-link-text">项目</span>
                <span class="nav-link-indicator"></span>
              </router-link>
              <router-link
                to="/about"
                class="nav-link group"
                active-class="nav-link-active"
              >
                <span class="nav-link-text">关于</span>
                <span class="nav-link-indicator"></span>
              </router-link>
            </div>

            <!-- 显示滚动标题（滚动时） -->
            <div
              v-else
              key="scroll-title"
              @click="scrollToTop"
              class="scroll-title-container hidden md:flex"
            >
              <span class="scroll-title-text">{{ displayText }}</span>
            </div>
          </Transition>
        </div>

        <!-- 右侧操作 -->
        <div class="flex items-center gap-3">
          <!-- 搜索按钮 -->
          <button
            @click="toggleSearch"
            class="action-btn group"
            title="搜索 (Shift + S)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="action-btn-ripple"></span>
          </button>

          <!-- 移动端菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="action-btn group md:hidden"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span class="action-btn-ripple"></span>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="mobile-menu md:hidden">
          <router-link
            to="/"
            class="mobile-menu-link"
            @click="mobileMenuOpen = false"
          >
            主页
          </router-link>
          <router-link
            to="/articles"
            class="mobile-menu-link"
            @click="mobileMenuOpen = false"
          >
            文库
          </router-link>
          <router-link
            to="/projects"
            class="mobile-menu-link"
            @click="mobileMenuOpen = false"
          >
            项目
          </router-link>
          <router-link
            to="/about"
            class="mobile-menu-link"
            @click="mobileMenuOpen = false"
          >
            关于
          </router-link>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  transparent?: boolean
  articleTitle?: string
  customScrollText?: string
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false,
  articleTitle: '',
  customScrollText: '返回顶部'
})

const mobileMenuOpen = ref(false)
const scrollY = ref(0)
const showScrollTitle = ref(false)
const scrollThreshold = 100

const displayText = computed(() => {
  if (!showScrollTitle.value) return ''
  return props.articleTitle || props.customScrollText
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleSearch = () => {
  // 搜索功能待实现
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 滚动监听
const handleScroll = () => {
  scrollY.value = window.scrollY
  showScrollTitle.value = scrollY.value > scrollThreshold
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
  window.addEventListener('scroll', handleScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
/* ===== 基础导航栏样式 ===== */
.navbar-glass {
  @apply fixed top-0 left-0 right-0 z-[100] w-full;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px) saturate(200%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .navbar-glass {
  background: rgba(17, 24, 39, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.navbar-transparent {
  @apply fixed top-0 left-0 right-0 z-[100] w-full;
  background: transparent;
  border-bottom: none;
  box-shadow: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-transparent .logo-text,
.navbar-transparent .nav-link-text {
  @apply text-white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.navbar-transparent .action-btn {
  @apply text-white;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar-transparent .action-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.3);
}

/* ===== Logo 样式 ===== */
.logo-link {
  @apply relative inline-block;
  text-decoration: none;
}

.logo-text {
  @apply text-2xl font-bold;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
}

.logo-link:hover .logo-text {
  letter-spacing: 0.02em;
}

.logo-underline {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9, #3b82f6);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-link:hover .logo-underline {
  width: 100%;
}

/* ===== 导航链接样式 ===== */
.nav-link {
  @apply relative inline-flex items-center;
  text-decoration: none;
  padding: 0.5rem 0;
}

.nav-link-text {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300;
  letter-spacing: 0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover .nav-link-text {
  @apply text-primary-600 dark:text-primary-400;
  transform: translateY(-1px);
}

.nav-link-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9, #3b82f6);
  transform: translateX(-50%);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.nav-link:hover .nav-link-indicator,
.nav-link-active .nav-link-indicator {
  width: 100%;
}

.nav-link-active .nav-link-text {
  @apply text-primary-600 dark:text-primary-400;
  font-weight: 600;
}

/* ===== 滚动标题样式 ===== */
.scroll-title-container {
  @apply items-center px-5 py-2.5 rounded-xl cursor-pointer;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(59, 130, 246, 0.08));
  border: 1px solid rgba(14, 165, 233, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 600px;
  backdrop-filter: blur(8px);
}

.scroll-title-container:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(59, 130, 246, 0.12));
  border-color: rgba(14, 165, 233, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
}

.scroll-title-text {
  @apply text-sm font-semibold text-gray-900 dark:text-gray-100;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.navbar-transparent .scroll-title-container {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
}

.navbar-transparent .scroll-title-container:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.35);
}

.navbar-transparent .scroll-title-text {
  @apply text-white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* ===== 操作按钮样式 ===== */
.action-btn {
  @apply relative p-2.5 rounded-xl overflow-hidden;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(59, 130, 246, 0.08));
  border: 1px solid rgba(14, 165, 233, 0.12);
  color: #0ea5e9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-btn:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(59, 130, 246, 0.15));
  border-color: rgba(14, 165, 233, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
}

.action-btn:active {
  transform: translateY(0) scale(0.95);
}

.action-btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.4), transparent);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
  pointer-events: none;
}

.action-btn:hover .action-btn-ripple {
  width: 120px;
  height: 120px;
}

.dark .action-btn {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(59, 130, 246, 0.12));
  border-color: rgba(14, 165, 233, 0.2);
  color: #38bdf8;
}

.dark .action-btn:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(59, 130, 246, 0.2));
  border-color: rgba(14, 165, 233, 0.3);
}

/* ===== 移动端菜单样式 ===== */
.mobile-menu {
  @apply py-4 border-t border-gray-200 dark:border-gray-700;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
}

.dark .mobile-menu {
  background: rgba(17, 24, 39, 0.95);
}

.mobile-menu-link {
  @apply block py-3 px-4 text-gray-700 dark:text-gray-300 font-medium;
  @apply rounded-lg transition-all duration-300;
  text-decoration: none;
}

.mobile-menu-link:hover {
  @apply bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400;
  transform: translateX(4px);
}

/* ===== 过渡动画 ===== */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>
