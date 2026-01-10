<template>
  <div class="min-h-screen">
    <div class="container-custom py-20">
      <div class="max-w-4xl mx-auto">
        <!-- 个人卡片 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-5xl font-bold">
              博
            </div>
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">博主</h1>
              <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">全栈开发者 / 技术博主</p>
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <span class="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">Vue.js</span>
                <span class="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">TypeScript</span>
                <span class="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">Node.js</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 关于我 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">关于我</h2>
          <div class="prose dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              你好！我是一名热爱技术的全栈开发者，专注于前端开发和用户体验设计。
              我喜欢探索新技术，分享开发经验，希望通过这个博客记录我的学习历程，
              也希望能帮助到更多的开发者朋友。
            </p>
          </div>
        </div>

        <!-- 技能 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">技能</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">前端开发</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Vue 3</span>
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">React</span>
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">TypeScript</span>
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Tailwind CSS</span>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">后端开发</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Node.js</span>
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Express</span>
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">MongoDB</span>
                <span class="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">MySQL</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系方式 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">联系我</h2>
          <div class="flex flex-wrap gap-4">
            <a href="#" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="#" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>
            <a href="#" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 关于页面组件
</script>
