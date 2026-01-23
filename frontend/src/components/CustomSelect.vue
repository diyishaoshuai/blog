<template>
  <div class="custom-select" ref="selectRef">
    <button
      @click="toggleDropdown"
      class="select-trigger"
      :class="{ 'active': isOpen }"
      type="button"
    >
      <span class="select-icon">
        <slot name="icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        </slot>
      </span>
      <span class="select-label">{{ selectedLabel }}</span>
      <span class="select-arrow" :class="{ 'rotate': isOpen }">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <div class="dropdown-inner">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="dropdown-option"
            :class="{ 'selected': modelValue === option.value }"
            type="button"
          >
            <span class="option-label">{{ option.label }}</span>
            <span v-if="modelValue === option.value" class="option-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface SelectOption {
  label: string
  value: string
}

interface Props {
  modelValue: string
  options: SelectOption[]
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option?.label || props.options[0]?.label || ''
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: SelectOption) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.custom-select {
  @apply relative;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.select-trigger {
  @apply w-full flex items-center gap-3 px-5 py-3 rounded-xl;
  @apply bg-white dark:bg-gray-800;
  @apply border-2 border-gray-200 dark:border-gray-700;
  @apply text-gray-700 dark:text-gray-300;
  @apply transition-all duration-300 ease-out;
  @apply hover:border-primary-400 dark:hover:border-primary-500;
  @apply hover:shadow-lg hover:shadow-primary-500/10;
  @apply focus:outline-none focus:border-primary-500 dark:focus:border-primary-400;
  @apply focus:shadow-xl focus:shadow-primary-500/20;
  min-width: 200px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.select-trigger.active {
  @apply border-primary-500 dark:border-primary-400;
  @apply shadow-xl shadow-primary-500/20;
}

.select-icon {
  @apply w-5 h-5 text-primary-500 dark:text-primary-400;
  @apply flex-shrink-0;
}

.select-icon svg {
  @apply w-full h-full;
}

.select-label {
  @apply flex-1 text-left text-sm;
}

.select-arrow {
  @apply w-5 h-5 text-gray-400 dark:text-gray-600;
  @apply transition-transform duration-300;
  @apply flex-shrink-0;
}

.select-arrow.rotate {
  transform: rotate(180deg);
}

.select-arrow svg {
  @apply w-full h-full;
}

/* 下拉菜单 */
.select-dropdown {
  @apply absolute top-full left-0 right-0 mt-2 z-50;
  @apply bg-white dark:bg-gray-800;
  @apply border-2 border-gray-200 dark:border-gray-700;
  @apply rounded-xl shadow-2xl;
  @apply overflow-hidden;
}

.dropdown-inner {
  @apply py-2;
  max-height: 300px;
  overflow-y: auto;
}

/* 下拉选项 */
.dropdown-option {
  @apply w-full flex items-center justify-between px-5 py-3;
  @apply text-gray-700 dark:text-gray-300 text-sm;
  @apply transition-all duration-200;
  @apply hover:bg-primary-50 dark:hover:bg-primary-900/20;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.dropdown-option.selected {
  @apply bg-primary-100 dark:bg-primary-900/30;
  @apply text-primary-600 dark:text-primary-400;
}

.option-label {
  @apply flex-1;
}

.option-check {
  @apply w-5 h-5 text-primary-500 dark:text-primary-400;
  @apply flex-shrink-0;
}

.option-check svg {
  @apply w-full h-full;
}

/* 下拉动画 */
.dropdown-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}
</style>
