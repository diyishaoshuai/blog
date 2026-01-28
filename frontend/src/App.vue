<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 滚动进度条 -->
    <ScrollProgress />

    <!-- 粒子背景 -->
    <ParticleBackground />

    <Navbar ref="navbarRef" />
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
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import FloatingActionBar from './components/FloatingActionBar.vue'
import { useScrollPosition } from './composables/useScrollPosition'

const navbarRef = ref<InstanceType<typeof Navbar> | null>(null)
const floatingBarRef = ref<InstanceType<typeof FloatingActionBar> | null>(null)

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
