<template>
  <div class="tag-cloud-card">
    <!-- 方案2: 卡片式标签 - 整齐排列 -->
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="tag in tags"
        :key="tag.name"
        class="tag-card"
        :style="{ 
          '--tag-ratio': tag.count / maxCount 
        }"
      >
        <span class="tag-name">{{ tag.name }}</span>
        <span class="tag-count">{{ tag.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Tag {
  name: string
  count: number
}

const props = defineProps<{
  tags: Tag[]
}>()

const maxCount = computed(() => Math.max(...props.tags.map(t => t.count)))
</script>

<style scoped>
.tag-cloud-card {
  @apply min-h-[200px];
}

.tag-card {
  @apply flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-600 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, calc(var(--tag-ratio) * 0.15)) 0%,
    rgba(139, 92, 246, calc(var(--tag-ratio) * 0.15)) 100%
  );
}

.tag-card:hover {
  @apply border-primary-400 dark:border-primary-600;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, calc(var(--tag-ratio) * 0.25)) 0%,
    rgba(139, 92, 246, calc(var(--tag-ratio) * 0.25)) 100%
  );
}

.tag-name {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300;
}

.tag-count {
  @apply text-xs font-bold text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30;
}
</style>

