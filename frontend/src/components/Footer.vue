<template>
  <footer class="footer-container mt-32 relative">
    <!-- 增强的波浪效果 -->
    <div class="wave-container">
      <svg class="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="wave-path wave-1"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="wave-path wave-2"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="wave-path wave-3"></path>
      </svg>
    </div>

    <!-- 主要内容区域 -->
    <div class="footer-content">
      <div class="footer-inner">
        <!-- 导航链接组 - 居中展示 -->
        <nav class="footer-nav" aria-label="页脚导航">
          <div class="nav-group">
            <router-link to="/" class="nav-link">主页</router-link>
            <span class="nav-separator">·</span>
            <router-link to="/articles" class="nav-link">博客</router-link>
            <span class="nav-separator">·</span>
            <router-link to="/about" class="nav-link">关于</router-link>
          </div>
        </nav>

        <!-- 分类标签 -->
        <div class="footer-tags">
          <a href="#" class="tag-link">教程</a>
          <a href="#" class="tag-link">设计</a>
          <a href="#" class="tag-link">开发</a>
          <a href="#" class="tag-link">日常</a>
        </div>

        <!-- 社交链接 -->
        <div class="footer-social">
          <a href="#" class="social-link" aria-label="邮箱">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="微博">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.68 14.89c-1.67.13-3.12-.84-3.23-2.16-.11-1.32 1.16-2.5 2.83-2.63 1.67-.13 3.12.84 3.23 2.16.11 1.32-1.16 2.5-2.83 2.63zm6.92-2.34c-.19-.08-.32-.13-.22-.48.22-.76.24-1.42.01-1.89-.43-.87-1.6-1.32-3.3-1.21 0 0-.54.04-.4-.33.26-.73.22-1.34-.16-1.69-.86-.8-3.14.03-5.09 1.85-1.46 1.36-2.31 2.8-2.31 4.04 0 2.38 3.05 3.83 6.03 3.83 3.91 0 6.51-2.27 6.51-4.07 0-1.09-.92-1.71-1.07-1.05zM20 7.5c-.64-2.27-2.47-3.87-4.61-4.07-.46-.04-.78.31-.71.7.07.39.43.66.89.7 1.53.14 2.85 1.28 3.32 2.91.11.38.46.62.84.56.42-.07.69-.48.27-.8z" />
            </svg>
          </a>
        </div>

        <!-- 装饰性分隔线 -->
        <div class="footer-divider"></div>

        <!-- 版权信息 -->
        <div class="footer-copyright">
          <p class="copyright-text">
            © {{ currentYear }} 个人博客
            <span class="copyright-dot">·</span>
            <span class="copyright-tagline">用心记录，分享生活</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-container {
  @apply relative overflow-hidden;
}

.wave-container {
  @apply absolute left-0 w-full overflow-hidden;
  top: -120px;
  height: 120px;
  line-height: 0;
}

.wave {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 120px;
  animation: wave-animation 15s ease-in-out infinite;
}

.wave-path {
  fill: #ffffff;
  transition: fill 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.wave-path:nth-child(1) {
  animation: wave-move 10s ease-in-out infinite;
}

.wave-path:nth-child(2) {
  animation: wave-move 15s ease-in-out infinite reverse;
}

.wave-path:nth-child(3) {
  animation: wave-move 20s ease-in-out infinite;
}

.dark .wave-path {
  fill: #111827;
}

@keyframes wave-animation {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25px);
  }
}

@keyframes wave-move {
  0%, 100% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-25px) translateZ(0) scaleY(1.1);
  }
}

/* 主要内容区域 */
.footer-content {
  @apply bg-white dark:bg-gray-900;
  @apply py-16;
}

.footer-inner {
  @apply max-w-3xl mx-auto px-6;
  @apply flex flex-col items-center gap-8;
}

/* 导航链接 */
.footer-nav {
  @apply w-full;
}

.nav-group {
  @apply flex items-center justify-center gap-3;
  @apply text-base;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.nav-link {
  @apply text-gray-700 dark:text-gray-300;
  @apply transition-all duration-300;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply hover:scale-110;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.nav-separator {
  @apply text-gray-400 dark:text-gray-600;
  @apply opacity-50;
}

/* 分类标签 */
.footer-tags {
  @apply flex items-center justify-center gap-3 flex-wrap;
}

.tag-link {
  @apply px-4 py-2 rounded-full text-sm;
  @apply bg-gray-100 dark:bg-gray-800;
  @apply text-gray-600 dark:text-gray-400;
  @apply border-2 border-transparent;
  @apply transition-all duration-300;
  @apply hover:border-primary-400 dark:hover:border-primary-500;
  @apply hover:bg-primary-50 dark:hover:bg-primary-900/20;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply hover:scale-105;
  font-weight: 500;
}

/* 社交链接 */
.footer-social {
  @apply flex items-center justify-center gap-4;
}

.social-link {
  @apply w-12 h-12 rounded-full flex items-center justify-center;
  @apply bg-gray-100 dark:bg-gray-800;
  @apply text-gray-600 dark:text-gray-400;
  @apply transition-all duration-300;
  @apply hover:bg-primary-500 dark:hover:bg-primary-600;
  @apply hover:text-white;
  @apply hover:scale-110 hover:-translate-y-1;
  @apply hover:shadow-lg hover:shadow-primary-500/40;
}

.social-link svg {
  @apply w-5 h-5;
}

/* 装饰性分隔线 */
.footer-divider {
  @apply w-24 h-px;
  @apply bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent;
}

/* 版权信息 */
.footer-copyright {
  @apply text-center;
}

.copyright-text {
  @apply text-sm text-gray-500 dark:text-gray-500;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
}

.copyright-dot {
  @apply mx-2 text-gray-400 dark:text-gray-600;
}

.copyright-tagline {
  @apply text-gray-400 dark:text-gray-600;
}
</style>
