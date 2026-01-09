<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 粒子背景 -->
    <ParticleBackground />

    <Navbar ref="navbarRef" />
    <main class="container-custom py-8 pt-24 relative z-10">
      <RouterView />
    </main>
    <Footer />

    <!-- 主题切换动画遮罩 -->
    <Transition name="theme-transition">
      <div
        v-if="navbarRef?.isTransitioning"
        class="theme-overlay"
        :style="{
          left: navbarRef?.overlayPosition.x + 'px',
          top: navbarRef?.overlayPosition.y + 'px',
          backgroundColor: navbarRef?.overlayColor
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

const navbarRef = ref<InstanceType<typeof Navbar> | null>(null)
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
