<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 滚动进度条 -->
    <ScrollProgress />

    <!-- 粒子背景 -->
    <ParticleBackground />

    <Navbar
      ref="navbarRef"
      :transparent="isTransparentNavbar"
      :article-title="currentArticleTitle"
      custom-scroll-text="返回顶部 ↑"
    />
    <main class="container-custom pt-24 pb-5 relative z-10">
      <RouterView />
    </main>
    <Footer />

    <!-- 浮动操作按钮 -->
    <FloatingActionBar ref="floatingBarRef" />

    <!-- 主题切换动画遮罩 -->
    <Transition name="theme-transition">
      <div
        v-if="floatingBarRef?.isTransitioning"
        class="theme-overlay"
        :style="{
          left: floatingBarRef?.overlayPosition.x + 'px',
          top: floatingBarRef?.overlayPosition.y + 'px',
          backgroundColor: floatingBarRef?.overlayColor
        }"
      ></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import FloatingActionBar from './components/FloatingActionBar.vue'
import { useScrollPosition } from './composables/useScrollPosition'

const route = useRoute()
const navbarRef = ref<InstanceType<typeof Navbar> | null>(null)
const floatingBarRef = ref<InstanceType<typeof FloatingActionBar> | null>(null)
const currentArticleTitle = ref('')

// 判断是否需要透明导航栏（首页和文章详情页）
const isTransparentNavbar = computed(() => {
  return route.path === '/' || route.path.startsWith('/article/')
})

// 监听路由变化，更新文章标题
watch(() => route.path, async (newPath) => {
  if (newPath.startsWith('/article/')) {
    // 在实际应用中，这里应该从 API 或 store 获取文章标题
    // 目前使用占位符
    currentArticleTitle.value = '我在2026年推荐的Mac软件'
  } else {
    currentArticleTitle.value = ''
  }
}, { immediate: true })

// 初始化滚动位置管理（页面刷新后恢复滚动位置）
const { initScrollPosition } = useScrollPosition()
initScrollPosition()
</script>

<style scoped>
/* 主题切换动画遮罩 */
.theme-overlay {
  position: fixed;
  width: 200vmax;
  height: 200vmax;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  z-index: 9999;
  will-change: transform, opacity;
  opacity: 0.98;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.theme-transition-enter-active {
  animation: expand 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.theme-transition-leave-active {
  animation: shrink 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes expand {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.85;
  }
  40% {
    opacity: 0.98;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes shrink {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  60% {
    opacity: 0.95;
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}
</style>
