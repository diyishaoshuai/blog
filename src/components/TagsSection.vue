<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <!-- 标题和查看全部按钮 -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">标签</h3>
      <button
        @click="showAllTags = true"
        class="text-xs px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        查看全部
      </button>
    </div>

    <!-- 前10个标签 -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in topTags"
        :key="tag.name"
        class="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-all duration-300 hover:scale-105"
      >
        {{ tag.name }} <span class="text-xs opacity-70">{{ tag.count }}</span>
      </span>
    </div>

    <!-- 全部标签弹窗 -->
    <TagsModal
      v-if="showAllTags"
      :tags="tags"
      @close="showAllTags = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TagsModal from './TagsModal.vue'

interface Tag {
  name: string
  count: number
}

interface Props {
  tags: Tag[]
}

const props = defineProps<Props>()

const showAllTags = ref(false)

// 前10个标签（按数量排序）
const topTags = computed(() => {
  return [...props.tags]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})
</script>
