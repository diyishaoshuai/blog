<template>
  <div class="carousel-container">
    <!-- 左侧图片展示区 -->
    <div class="carousel-image-section">
      <div class="image-wrapper">
        <img
          :src="items[currentIndex].image"
          :alt="items[currentIndex].title"
          class="carousel-image"
        />
      </div>
    </div>

    <!-- 右侧列表区 -->
    <div
      class="carousel-list-section"
      :style="{ backgroundColor: items[currentIndex].themeColor }"
      @mouseleave="handleMouseLeave"
    >
      <div class="list-wrapper">
        <div
          v-for="(item, index) in items"
          :key="index"
          @mouseenter="handleMouseEnter(index)"
          :class="[
            'list-item',
            currentIndex === index ? 'list-item-active' : ''
          ]"
        >
          <div class="item-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="item-content">
            <div class="text-block">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface CarouselItem {
  title: string
  description: string
  image: string
  themeColor: string
}

const items = ref<CarouselItem[]>([
  {
    title: '洪绘电子章 - 给PDF快速盖章、骑缝章',
    description: '快速为PDF文档添加电子印章，支持骑缝章功能',
    image: 'https://picsum.photos/800/400?random=1',
    themeColor: '#ef4444'
  },
  {
    title: '敲木鱼App - 打节拍敲音效解压神器',
    description: '通过敲击木鱼的声音和节奏来缓解压力，放松心情',
    image: 'https://picsum.photos/800/400?random=2',
    themeColor: '#3b82f6'
  },
  {
    title: '洪墨AI - 构建具有AI优势的先进网站',
    description: '利用AI技术构建现代化、智能化的网站解决方案',
    image: 'https://picsum.photos/800/400?random=3',
    themeColor: '#8b5cf6'
  },
  {
    title: 'HeoAwards2025:年度我喜欢的博主',
    description: '2025年度我最喜欢的博主评选活动',
    image: 'https://picsum.photos/800/400?random=4',
    themeColor: '#10b981'
  },
  {
    title: '博客六周年记',
    description: '记录博客运营六周年的点点滴滴',
    image: 'https://picsum.photos/800/400?random=5',
    themeColor: '#f59e0b'
  },
  {
    title: 'Vue 3 + TypeScript 开发实战',
    description: '使用 Vue 3 和 TypeScript 构建现代化 Web 应用',
    image: 'https://picsum.photos/800/400?random=6',
    themeColor: '#06b6d4'
  }
])

const currentIndex = ref(0)
let autoplayTimer: NodeJS.Timeout | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % items.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? items.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, 5000) // 5秒自动切换
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// 鼠标进入列表项时停止轮播
const handleMouseEnter = (index: number) => {
  stopAutoplay()
  goToSlide(index)
}

// 鼠标离开列表区域时重新开始轮播
const handleMouseLeave = () => {
  stopAutoplay()
  autoplayTimer = setTimeout(() => {
    startAutoplay()
  }, 5000) // 5秒后重新开始轮播
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.carousel-container {
  @apply flex rounded-xl overflow-hidden shadow-lg;
  height: 450px;
}

.carousel-image-section {
  @apply flex-1 relative overflow-hidden;
}

.image-wrapper {
  @apply w-full h-full relative;
}

.carousel-image {
  @apply w-full h-full object-cover;
  transition: transform 0.5s ease;
}

.carousel-image-section:hover .carousel-image {
  transform: scale(1.05);
}

.carousel-list-section {
  @apply w-96 flex flex-col;
  transition: background-color 0.5s ease;
}

.list-wrapper {
  @apply flex flex-col p-0 h-full;
}

.list-item {
  @apply flex gap-4 cursor-pointer transition-all duration-300;
  padding: 12px 16px;
  height: 75px;
  box-sizing: border-box;
}

.list-item:hover {
  transform: translateX(4px);
}

.list-item-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.item-number {
  @apply flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg;
  background-color: rgba(255, 255, 255, 0.2);
}

.item-content {
  @apply flex-1 min-w-0;
}

.text-block {
  position: relative;
  display: block;
  width: 100%;
}

.item-title {
  @apply text-white font-bold text-sm mb-1;
  display: inline-block;
  position: relative;
  padding-bottom: 4px;
}

.item-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1));
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.item-description {
  @apply text-white/80 text-xs;
  display: inline-block;
  position: relative;
  padding-bottom: 4px;
}

.item-description::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8));
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
}

.list-item:hover .item-title::after {
  width: 100%;
}

.list-item:hover .item-description::after {
  width: 100%;
}
</style>

