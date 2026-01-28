import { onMounted, onUnmounted, nextTick } from 'vue'

/**
 * 滚动位置管理 composable
 * 用于在页面刷新后恢复滚动位置
 */
export function useScrollPosition() {
  let scrollTimer: number | null = null

  /**
   * 保存当前滚动位置到 sessionStorage
   * 使用防抖优化性能
   */
  const saveScrollPosition = () => {
    const scrollData = {
      x: window.scrollX,
      y: window.scrollY,
      path: window.location.pathname
    }
    sessionStorage.setItem('scrollPosition', JSON.stringify(scrollData))
  }

  /**
   * 从 sessionStorage 恢复滚动位置
   * 只在路径匹配时恢复
   */
  const restoreScrollPosition = async () => {
    try {
      const saved = sessionStorage.getItem('scrollPosition')
      if (saved) {
        const { x, y, path } = JSON.parse(saved)

        // 只在路径匹配时恢复滚动位置
        if (path === window.location.pathname) {
          // 等待 Vue 完成 DOM 更新
          await nextTick()

          // 再延迟一小段时间，确保异步内容加载完成
          setTimeout(() => {
            window.scrollTo(x, y)
          }, 100)
        }
      }
    } catch (error) {
      console.error('Failed to restore scroll position:', error)
    }
  }

  /**
   * 防抖处理的滚动事件监听器
   * 减少 sessionStorage 写入频率
   */
  const handleScroll = () => {
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer)
    }

    scrollTimer = window.setTimeout(() => {
      saveScrollPosition()
      scrollTimer = null
    }, 200) // 200ms 防抖延迟
  }

  /**
   * 页面卸载前保存滚动位置
   */
  const handleBeforeUnload = () => {
    saveScrollPosition()
  }

  /**
   * 初始化滚动位置管理
   */
  const initScrollPosition = () => {
    onMounted(() => {
      // 恢复滚动位置
      restoreScrollPosition()

      // 监听滚动事件
      window.addEventListener('scroll', handleScroll, { passive: true })

      // 监听页面卸载事件
      window.addEventListener('beforeunload', handleBeforeUnload)
    })

    onUnmounted(() => {
      // 清理事件监听器
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)

      // 清理定时器
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer)
      }
    })
  }

  return {
    initScrollPosition,
    saveScrollPosition,
    restoreScrollPosition
  }
}
