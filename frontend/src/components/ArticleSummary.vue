<template>
  <div class="summary-card bg-gradient-to-br from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 rounded-2xl p-6 mb-8 border border-primary-100 dark:border-primary-800/30 relative overflow-hidden">
    <!-- Animated background effect -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary-400/20 to-transparent rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="flex items-start gap-4 relative z-10">
      <!-- AI Icon -->
      <div class="flex-shrink-0">
        <div class="icon-container w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 bg-white/20 animate-shimmer"></div>
          <svg class="w-6 h-6 text-white relative z-10 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-3">
          <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">文章摘要</h3>
          <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-500/10 text-primary-700 dark:text-primary-300">
            AI 生成
          </span>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ summary }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  summary: string
}

defineProps<Props>()
</script>

<style scoped>
.summary-card {
  animation: fadeInUp 0.6s ease-out;
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

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.icon-container {
  box-shadow: 0 8px 16px rgba(14, 165, 233, 0.3);
  transition: transform 0.3s ease;
}

.icon-container:hover {
  transform: scale(1.1) rotate(5deg);
}
</style>
