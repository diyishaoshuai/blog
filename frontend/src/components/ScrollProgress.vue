<template>
  <div class="scroll-progress-container">
    <!-- 主进度条 -->
    <div
      class="progress-bar"
      :style="{ transform: `scaleX(${scrollProgress / 100})` }"
    >
      <!-- 渐变光效 -->
      <div class="progress-glow"></div>

      <!-- 粒子效果 -->
      <div class="progress-particles">
        <span
          v-for="i in 5"
          :key="i"
          class="particle"
          :style="{ animationDelay: `${i * 0.2}s` }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)
let ticking = false

const updateProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  const totalScroll = documentHeight - windowHeight
  const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0

  scrollProgress.value = Math.min(100, Math.max(0, progress))
  ticking = false
}

const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress)
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', requestTick, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestTick)
})
</script>

<style scoped>
.scroll-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 9999;
  pointer-events: none;
}

/* 主进度条 */
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #3b82f6 0%,
    #8b5cf6 25%,
    #ec4899 50%,
    #f59e0b 75%,
    #10b981 100%
  );
  transform-origin: left center;
  will-change: transform;
  box-shadow:
    0 0 20px rgba(59, 130, 246, 0.6),
    0 0 40px rgba(139, 92, 246, 0.4),
    0 0 60px rgba(236, 72, 153, 0.3);
}

/* 渐变光效 */
.progress-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 粒子效果 */
.progress-particles {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  overflow: visible;
}

.particle {
  position: absolute;
  right: 0;
  top: 50%;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: particle-float 1.5s ease-out infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

@keyframes particle-float {
  0% {
    transform: translate(0, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50px, -50%) scale(0);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .scroll-progress-container {
    height: 3px;
  }
}
</style>
