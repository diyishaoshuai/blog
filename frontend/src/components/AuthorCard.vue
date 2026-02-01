<template>
  <div class="author-card bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
    <!-- Author Info -->
    <div class="flex items-center gap-4 mb-6">
      <!-- Avatar with Background -->
      <div class="relative avatar-wrapper">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-400 to-cyan-400 rounded-full blur-md opacity-50 animate-pulse-glow"></div>
        <img
          :src="avatar"
          :alt="name"
          class="relative w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ name }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3">
      <button class="btn-primary flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden group">
        <span class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <svg class="w-5 h-5 relative z-10 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="relative z-10">打赏作者</span>
      </button>

      <button class="btn-secondary px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        订阅
      </button>
    </div>

    <!-- Copyright Notice -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
      <p class="mb-2">
        本文是原创文章，采用
        <a href="/cc/" class="text-primary-600 dark:text-primary-400 hover:underline">CC BY-NC-ND 4.0</a>
        协议
      </p>
      <p>
        完整转载请注明来自
        <a href="/" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">{{ siteName }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  description: string
  avatar: string
  siteName?: string
}

withDefaults(defineProps<Props>(), {
  siteName: '个人博客'
})
</script>

<style scoped>
.author-card {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}
</style>
