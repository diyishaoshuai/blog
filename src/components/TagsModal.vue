<template>
  <!-- 遮罩层 -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="true"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <!-- 弹窗内容 -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <!-- 头部 -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">全部标签</h2>
            <button
              @click="$emit('close')"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 搜索框 -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索标签..."
                class="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all"
              >
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- 标签列表 -->
          <div class="p-6 overflow-y-auto max-h-[50vh]">
            <div v-if="filteredTags.length > 0" class="flex flex-wrap gap-3">
              <span
                v-for="tag in filteredTags"
                :key="tag.name"
                class="px-4 py-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 text-white text-sm font-medium cursor-pointer hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                {{ tag.name }} <span class="opacity-80">{{ tag.count }}</span>
              </span>
            </div>
            <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>没有找到匹配的标签</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Tag {
  name: string
  count: number
}

interface Props {
  tags: Tag[]
}

const props = defineProps<Props>()
defineEmits<{
  close: []
}>()

const searchQuery = ref('')

// 过滤标签
const filteredTags = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.tags
  }
  return props.tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
/* 弹窗过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>
