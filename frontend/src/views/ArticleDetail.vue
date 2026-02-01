<template>
  <div class="article-detail-page">
    <!-- Hero Banner - Full Width -->
    <div class="hero-wrapper">
      <ArticleHeroBanner
      :title="article.title"
      :category="article.category"
      :tags="article.tags"
      :word-count="wordCount"
      :reading-time="readingTime"
      :date="article.createdAt"
      :views="article.views"
      :comments="0"
      background-type="image"
      :author-name="article.author.username"
      author-avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
      author-description="分享设计与科技生活"
    />
    </div>

    <!-- Content Area -->
    <div class="container-custom py-3">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        <!-- Main Content -->
        <article class="lg:col-span-8">
          <!-- AI Summary -->
          <ArticleSummary :summary="article.summary" />

          <!-- Article Content -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 mb-2.5 border border-gray-200 dark:border-gray-700">
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-lg leading-relaxed">{{ article.content }}</p>
            </div>
          </div>

          <!-- Author Card -->
          <AuthorCard
            name="博主"
            description="分享设计与科技生活"
            avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          />

          <!-- Related Articles -->
          <div class="mt-2.5">
            <RelatedArticles :articles="relatedArticles" @shuffle="shuffleRelated" />
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="lg:col-span-4">
          <div class="sticky top-24 space-y-2.5">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Article } from '@/types'
import { formatDate } from '@/utils'
import ArticleHeroBanner from '@/components/ArticleHeroBanner.vue'
import ArticleSummary from '@/components/ArticleSummary.vue'
import AuthorCard from '@/components/AuthorCard.vue'
import RelatedArticles from '@/components/RelatedArticles.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
const articleId = route.params.id

// 模拟文章数据
const article = ref<Article>({
  _id: articleId as string,
  title: '我在2026年推荐的Mac软件',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
  summary: '又到了新的一年啦，这一年，Mac依旧是我最重要的生产力工具。',
  tags: ['软件', 'Mac', '推荐'],
  category: '软件推荐',
  author: {
    _id: '1',
    username: '博主',
    email: 'blog@example.com',
    role: 'admin'
  },
  views: 3382,
  likes: 128,
  createdAt: '2025-10-02T00:00:00Z',
  updatedAt: '2025-10-02T00:00:00Z'
})

// Calculate word count and reading time
const wordCount = computed(() => {
  return article.value.content.length
})

const readingTime = computed(() => {
  const wordsPerMinute = 300
  return Math.ceil(wordCount.value / wordsPerMinute)
})

// Related articles
const relatedArticles = ref([
  {
    id: '1',
    title: 'Final Cut Pro 如何给人物抠像？使用 FxFactory 实现人物抠像功能',
    cover: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400'
  },
  {
    id: '2',
    title: 'CommandPost上手：通过鼠标缩放你的 Final Cut Pro 时间线',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'
  }
])

const shuffleRelated = () => {
  // Shuffle logic here
  console.log('Shuffling related articles...')
}
</script>

<style scoped>
.article-detail-page {
  min-height: 100vh;
}

.hero-wrapper {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  max-width: 100vw;
}
</style>

