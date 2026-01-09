<template>
  <footer class="footer-container mt-20 relative">
    <!-- 波浪效果 -->
    <div class="wave-container">
      <svg class="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="wave-path"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="wave-path"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="wave-path"></path>
      </svg>
    </div>

    <div class="footer-content bg-white dark:bg-gray-900">
      <div class="container-custom py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- 导航 -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">导航</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <router-link to="/" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  主页
                </router-link>
              </li>
              <li>
                <router-link to="/articles" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  博客
                </router-link>
              </li>
              <li>
                <router-link to="/about" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  关于
                </router-link>
              </li>
            </ul>
          </div>

          <!-- 分类 -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">分类</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  教程
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  设计
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  开发
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  日常
                </a>
              </li>
            </ul>
          </div>

          <!-- 联系 -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">联系</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  邮箱
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  微博
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {{ new Date().getFullYear() }} 个人博客. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 组件
</script>

<style scoped>
.footer-container {
  position: relative;
  overflow: hidden;
}

.wave-container {
  position: absolute;
  top: -120px;
  left: 0;
  width: 100%;
  height: 120px;
  overflow: hidden;
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
</style>
