<template>
  <div class="profile-card relative overflow-hidden">
    <!-- 头像区域 -->
    <div
      class="avatar-section"
      @mouseenter="showAbout = true"
      @mouseleave="showAbout = false"
    >
      <div class="avatar-wrapper">
        <div class="avatar-circle">
          <div
            class="avatar-content"
            :class="{ 'avatar-blurred': showAbout }"
          >
            <div class="avatar-placeholder">
              <span class="text-4xl">博</span>
            </div>
          </div>
          <!-- 右下角表情 -->
          <div class="emoji-badge">😊</div>
        </div>
      </div>

      <!-- 关于文字 - 显示在头像区域 -->
      <Transition name="fade">
        <div v-if="showAbout" class="about-text">
          <p class="text-white text-sm leading-relaxed">
            这有关于<strong>产品、设计、开发</strong>相关的问题和看法，还有<strong>文章翻译</strong>和<strong>分享</strong>。
            相信你可以在这里找到对你有用的<strong>知识</strong>和<strong>教程</strong>。
          </p>
        </div>
      </Transition>
    </div>

    <!-- 底部信息（固定在底部） -->
    <div class="info-section absolute bottom-0 left-0 w-full px-6 pb-6">
      <div class="name-section">
        <h3 class="name">第一少帅</h3>
        <p class="name-en">First General</p>
      </div>
      <div class="social-icons">
        <a
          href="https://space.bilibili.com"
          target="_blank"
          class="social-icon iconfont icon-bilibili"
          title="B站"
        >
        </a>
        <a
          href="https://github.com"
          target="_blank"
          class="social-icon iconfont icon-github"
          title="GitHub"
        >
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAbout = ref(false)
</script>

<style scoped>
.profile-card {
  @apply bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 shadow-lg;
  min-height: 280px;
}

.avatar-section {
  @apply flex flex-col items-center justify-center mb-6 relative;
  min-height: 200px;
}

.avatar-wrapper {
  @apply relative;
}

.avatar-circle {
  @apply relative w-24 h-24;
}

.avatar-content {
  @apply w-full h-full rounded-full bg-gradient-to-r from-red-400 to-yellow-400 flex items-center justify-center overflow-hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: filter 0.5s ease, opacity 0.5s ease;
}

.avatar-blurred {
  filter: blur(8px);
  opacity: 0.6;
}

.avatar-placeholder {
  @apply w-full h-full flex items-center justify-center text-white font-bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.emoji-badge {
  @apply absolute -bottom-1 -right-1 text-2xl;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.1);
  }
}

.about-text {
  @apply absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 z-10;
  text-align: center;
}

.info-section {
  @apply flex items-end justify-between;
}

.name-section {
  @apply flex-1;
}

.name {
  @apply text-white text-2xl font-bold mb-1;
}

.name-en {
  @apply text-white/80 text-sm font-normal;
}

.social-icons {
  @apply flex gap-3;
}

.social-icon {
  @apply w-14 h-14 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 relative text-xl;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
