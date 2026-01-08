<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 关于 -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">关于</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            这有关于<strong>产品、设计、开发</strong>相关的问题和看法，还有<strong>文章翻译</strong>和<strong>分享</strong>。
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            相信你可以在这里找到对你有用的<strong>知识</strong>和<strong>教程</strong>。
          </p>
        </div>

        <!-- 导航 -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">导航</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                主页
              </router-link>
            </li>
            <li>
              <router-link to="/articles" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                博客
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                关于
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 分类 -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">分类</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                教程
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                设计
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                开发
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                日常
              </a>
            </li>
          </ul>
        </div>

        <!-- 联系 -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">联系</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                邮箱
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                微博
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {{ new Date().getFullYear() }} 个人博客. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 组件
</script>

