import { ref, onMounted, onUnmounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)
  const isTransitioning = ref(false)
  const overlayPosition = ref({ x: 0, y: 0 })
  const overlayColor = ref('')

  const toggleDarkMode = (buttonElement?: HTMLElement | null) => {
    // 获取按钮位置（如果提供了按钮元素）
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect()
      overlayPosition.value = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    }

    // 固定遮罩层颜色（目标主题的颜色）
    overlayColor.value = isDark.value ? '#f9fafb' : '#111827'

    // 开始动画
    isTransitioning.value = true

    // 等待动画扩散到最大时再切换主题（动画 45% 时间，让切换更自然）
    setTimeout(() => {
      isDark.value = !isDark.value
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }, 225) // 0.5s 动画的 45%

    // 动画结束后移除遮罩
    setTimeout(() => {
      isTransitioning.value = false
    }, 500)
  }

  const initDarkMode = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
  }

  const setupKeyboardShortcut = (callback: () => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'D') {
        e.preventDefault()
        callback()
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }

  return {
    isDark,
    isTransitioning,
    overlayPosition,
    overlayColor,
    toggleDarkMode,
    initDarkMode,
    setupKeyboardShortcut
  }
}
