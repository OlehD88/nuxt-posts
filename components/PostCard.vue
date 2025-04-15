<script lang="ts" setup>
import type { Post } from '~/types/posts'

const { post } = defineProps<{ post: Post }>()
const titleLine = `${post.title} - ${post.headline}`
const statusLine = post.meta?.author ? `${post.status} by ${post.meta.author}` : post.status
</script>

<template>
  <div class="post-card dark-bg rounded-lg p-4 cursor-pointer">
    <div>
      <span>{{ post.platform }}</span>
      <span>{{ titleLine }}</span>
    </div>
    <div>{{ statusLine }}</div>
    <div>
      <span>{{ post.published_date }}</span>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  border: 1px solid var(--secondary-color);
}
</style>
