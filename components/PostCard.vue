<script lang="ts" setup>
import type { Post } from '~/types/posts'
import { getFormattedPostDate, getPlatformIconURL } from '~/utils'

const { post } = defineProps<{ post: Post }>()
const platformIcon = getPlatformIconURL(post.platform)
const dateToShow = getFormattedPostDate(post.published_date)
</script>

<template>
  <div class="post-card rounded-lg p-4 cursor-pointer">
    <div class="flex items-center mb-2 h-12">
      <img :src="`${platformIcon}`" alt="Platform Icon" class="w-8 h-8 mr-2" />
      <div>
        <span class="post-card-title line-height-1">
          {{ post.title || 'No title' }}
        </span>
        <span class="text-xs">{{ post.headline }}</span>
      </div>
    </div>
    <div>Status: {{ post.status }}</div>
    <div>Author: {{ post.meta.author || 'Unknown' }}</div>
    <div>
      Published: <span class="accent-color">{{ dateToShow }}</span>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  border: 1px solid var(--secondary-color);
}
.post-card:hover {
  background-color: var(--secondary-bg);
}

.post-card-title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
