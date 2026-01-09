<template>
  <div class="particle-background">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const createParticles = (canvas: HTMLCanvasElement) => {
  particles = []
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    })
  }
}

const updateParticles = (canvas: HTMLCanvasElement) => {
  particles.forEach(particle => {
    particle.x += particle.vx
    particle.y += particle.vy

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
  })
}

const drawParticles = (canvas: HTMLCanvasElement) => {
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    ctx!.beginPath()
    ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(14, 165, 233, ${particle.opacity})`
    ctx!.fill()
  })

  // 绘制连线
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(14, 165, 233, ${0.2 * (1 - distance / 150)})`
        ctx!.lineWidth = 1
        ctx!.moveTo(particles[i].x, particles[i].y)
        ctx!.lineTo(particles[j].x, particles[j].y)
        ctx!.stroke()
      }
    }
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  updateParticles(canvas)
  drawParticles(canvas)
  animationId = requestAnimationFrame(animate)
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  createParticles(canvas)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  createParticles(canvas)
  animate()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}

.dark .particle-background {
  opacity: 0.4;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
