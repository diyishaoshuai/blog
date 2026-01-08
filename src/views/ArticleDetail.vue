<template>
  <div class="min-h-screen">
    <div class="container-custom py-20">
      <article class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">文章详情</h1>
        <div class="prose dark:prose-invert max-w-none">
          <!-- Markdown 内容将在这里渲染 -->
          <p>文章内容加载中...</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id
</script>

