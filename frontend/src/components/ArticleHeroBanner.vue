<template>
  <div class="hero-wrapper">
    <!-- Background Layer -->
    <div class="absolute inset-0">
      <!-- Image Background -->
      <img
        v-if="backgroundType === 'image'"
        :src="coverImage"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <!-- Color Background -->
      <div
        v-else
        class="w-full h-full"
        :style="{ background: `linear-gradient(135deg, ${backgroundColor}, ${adjustColor(backgroundColor, -20)})` }"
      ></div>
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
    </div>

    <!-- Content Overlay -->
    <div class="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16 pt-32">
      <!-- Category and Tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/90 text-white backdrop-blur-sm">
          {{ category }}
        </span>
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer"
        >
          # {{ tag }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
        {{ title }}
      </h1>

      <!-- Author and Metadata Row -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <!-- Author Section -->
        <div class="flex items-center gap-4 animate-fade-in-left">
          <div
            class="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/30"
            :style="backgroundType === 'color' ? { background: backgroundColor } : {}"
          >
            <img
              :src="authorAvatar"
              :alt="authorName"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <div class="text-lg font-semibold text-white">{{ authorName }}</div>
            <div class="text-sm text-white/80">{{ authorDescription }}</div>
          </div>
        </div>

        <!-- Metadata Row -->
        <div class="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-white/90 animate-fade-in-right">
        <!-- Word Count -->
        <span class="flex items-center gap-2 metadata-item group cursor-pointer">
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {{ wordCount }} 字
        </span>

        <!-- Reading Time -->
        <span class="flex items-center gap-2 metadata-item group cursor-pointer">
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ readingTime }} 分钟
        </span>

        <!-- Date -->
        <span class="flex items-center gap-2 metadata-item group cursor-pointer">
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ formattedDate }}
        </span>

        <!-- Location Badge -->
        <span v-if="location" class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm metadata-item group cursor-pointer hover:bg-white/20 transition-all">
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ location }}
        </span>

        <!-- Views -->
        <span class="flex items-center gap-2 metadata-item group cursor-pointer">
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {{ views }}
        </span>

        <!-- Comments -->
        <span class="flex items-center gap-2 metadata-item group cursor-pointer hover:text-white transition-colors">
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {{ comments }}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '@/utils'

interface Props {
  title: string
  category: string
  tags: string[]
  coverImage?: string
  backgroundColor?: string
  backgroundType?: 'image' | 'color'
  wordCount: number
  readingTime: number
  date: string
  location?: string
  views: number
  comments: number
  authorName?: string
  authorAvatar?: string
  authorDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
  backgroundColor: '#0ea5e9',
  backgroundType: 'image',
  location: '北京',
  authorName: '博主',
  authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  authorDescription: '分享设计与科技生活'
})

const formattedDate = computed(() => formatDate(props.date, 'YYYY-MM-DD'))

// Helper function to adjust color brightness
const adjustColor = (color: string, amount: number) => {
  const clamp = (num: number) => Math.min(Math.max(num, 0), 255)
  const hex = color.replace('#', '')
  const r = clamp(parseInt(hex.substring(0, 2), 16) + amount)
  const g = clamp(parseInt(hex.substring(2, 4), 16) + amount)
  const b = clamp(parseInt(hex.substring(4, 6), 16) + amount)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: -80px;
  padding-top: 80px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .hero-wrapper {
    height: 600px;
  }
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out 0.2s both;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.metadata-item {
  transition: all 0.3s ease;
}

.metadata-item:hover {
  transform: translateY(-2px);
}
</style>
