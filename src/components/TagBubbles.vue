<template>
  <div class="relative w-full h-[400px] overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Tag {
  name: string
  count: number
}

interface Bubble {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  tag: Tag
  color: string
  hovered: boolean
}

const props = defineProps<{
  tags: Tag[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let bubbles: Bubble[] = []
let animationId: number | null = null
let mouseX = 0
let mouseY = 0
let isMouseInCanvas = false

// 颜色方案
const colors = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#f97316', // orange
  '#6366f1', // indigo
]

// 初始化气泡
const initBubbles = (canvas: HTMLCanvasElement) => {
  bubbles = []
  const width = canvas.width
  const height = canvas.height

  props.tags.forEach((tag, index) => {
    // 根据标签数量计算气泡大小
    const baseRadius = 30
    const sizeMultiplier = Math.log(tag.count + 1) / Math.log(10)
    const radius = baseRadius + sizeMultiplier * 15

    // 随机初始位置，确保不在边缘
    const x = radius + Math.random() * (width - radius * 2)
    const y = radius + Math.random() * (height - radius * 2)

    // 随机初始速度
    const angle = Math.random() * Math.PI * 2
    const speed = 0.5 + Math.random() * 1
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    bubbles.push({
      x,
      y,
      vx,
      vy,
      radius,
      tag,
      color: colors[index % colors.length],
      hovered: false
    })
  })
}

// 检测气泡碰撞
const checkCollision = (b1: Bubble, b2: Bubble) => {
  const dx = b2.x - b1.x
  const dy = b2.y - b1.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance < b1.radius + b2.radius
}

// 处理气泡碰撞
const handleCollision = (b1: Bubble, b2: Bubble) => {
  const dx = b2.x - b1.x
  const dy = b2.y - b1.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance === 0) return

  // 碰撞法向量
  const nx = dx / distance
  const ny = dy / distance

  // 相对速度
  const dvx = b1.vx - b2.vx
  const dvy = b1.vy - b2.vy

  // 相对速度在碰撞法向量上的投影
  const dvn = dvx * nx + dvy * ny

  // 如果气泡正在分离，不处理
  if (dvn > 0) return

  // 弹性碰撞系数
  const restitution = 0.8

  // 计算冲量
  const impulse = (2 * dvn) / 2

  // 更新速度
  b1.vx -= impulse * nx * restitution
  b1.vy -= impulse * ny * restitution
  b2.vx += impulse * nx * restitution
  b2.vy += impulse * ny * restitution

  // 分离重叠的气泡
  const overlap = (b1.radius + b2.radius - distance) / 2
  b1.x -= overlap * nx
  b1.y -= overlap * ny
  b2.x += overlap * nx
  b2.y += overlap * ny
}

// 更新气泡位置
const updateBubbles = (canvas: HTMLCanvasElement) => {
  const width = canvas.width
  const height = canvas.height

  bubbles.forEach((bubble) => {
    // 鼠标排斥力
    if (isMouseInCanvas) {
      const dx = bubble.x - mouseX
      const dy = bubble.y - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const minDistance = bubble.radius + 50

      if (distance < minDistance && distance > 0) {
        const force = (minDistance - distance) / minDistance
        bubble.vx += (dx / distance) * force * 0.5
        bubble.vy += (dy / distance) * force * 0.5
      }

      // 检测鼠标悬停
      bubble.hovered = distance < bubble.radius
    } else {
      bubble.hovered = false
    }

    // 更新位置
    bubble.x += bubble.vx
    bubble.y += bubble.vy

    // 边界碰撞检测
    if (bubble.x - bubble.radius < 0) {
      bubble.x = bubble.radius
      bubble.vx *= -0.8
    } else if (bubble.x + bubble.radius > width) {
      bubble.x = width - bubble.radius
      bubble.vx *= -0.8
    }

    if (bubble.y - bubble.radius < 0) {
      bubble.y = bubble.radius
      bubble.vy *= -0.8
    } else if (bubble.y + bubble.radius > height) {
      bubble.y = height - bubble.radius
      bubble.vy *= -0.8
    }

    // 速度衰减
    bubble.vx *= 0.99
    bubble.vy *= 0.99
  })

  // 检测气泡间碰撞
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      if (checkCollision(bubbles[i], bubbles[j])) {
        handleCollision(bubbles[i], bubbles[j])
      }
    }
  }
}

// 绘制气泡
const drawBubbles = () => {
  if (!ctx || !canvasRef.value) return

  const canvas = canvasRef.value
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  bubbles.forEach((bubble) => {
    const scale = bubble.hovered ? 1.15 : 1

    // 绘制阴影
    ctx.shadowColor = bubble.color
    ctx.shadowBlur = bubble.hovered ? 25 : 15
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // 绘制气泡圆形
    ctx.beginPath()
    ctx.arc(bubble.x, bubble.y, bubble.radius * scale, 0, Math.PI * 2)

    // 渐变填充
    const gradient = ctx.createRadialGradient(
      bubble.x - bubble.radius * 0.3,
      bubble.y - bubble.radius * 0.3,
      0,
      bubble.x,
      bubble.y,
      bubble.radius * scale
    )
    gradient.addColorStop(0, bubble.color + 'dd')
    gradient.addColorStop(1, bubble.color + '99')
    ctx.fillStyle = gradient
    ctx.fill()

    // 重置阴影
    ctx.shadowBlur = 0

    // 绘制文字
    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${Math.max(12, bubble.radius * 0.35)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(bubble.tag.name, bubble.x, bubble.y - 5)

    // 绘制数量
    ctx.font = `${Math.max(10, bubble.radius * 0.25)}px sans-serif`
    ctx.fillText(String(bubble.tag.count), bubble.x, bubble.y + 10)
  })
}

// 动画循环
const animate = () => {
  if (!canvasRef.value) return

  updateBubbles(canvasRef.value)
  drawBubbles()
  animationId = requestAnimationFrame(animate)
}

// 鼠标移动事件
const handleMouseMove = (e: MouseEvent) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  isMouseInCanvas = true
}

// 鼠标离开事件
const handleMouseLeave = () => {
  isMouseInCanvas = false
}

// 窗口大小调整
const handleResize = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  initBubbles(canvas)
}

// 组件挂载
onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置 canvas 尺寸
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  // 初始化气泡
  initBubbles(canvas)

  // 添加事件监听
  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('resize', handleResize)

  // 开始动画
  animate()
})

// 组件卸载
onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }

  if (canvasRef.value) {
    canvasRef.value.removeEventListener('mousemove', handleMouseMove)
    canvasRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
canvas {
  cursor: pointer;
}
</style>
