<script setup lang="ts">
import DOMPurify from 'dompurify'
import type { Post } from '~/types/posts'
import { getFormattedPostDate } from '~/utils/date'

const { post } = defineProps<{
  post: Post
}>()

const formattedDate = getFormattedPostDate(post?.published_date)
const platformIcon = getPlatformIconURL(post?.platform)

// Sanitize the HTML content to prevent XSS attacks
// We can specify what type of html is allowed here
const cleanHtmlContent = post?.content ? DOMPurify.sanitize(post.content) : ''

// For now we are using a placeholder image
// In the future we can use the post.meta.images array
const imageToShow = post?.meta?.images?.length
  ? '/images/office-cat.jpg'
  : '/images/no-image-placeholder.jpg'
</script>

<template>
  <div class="flex flex-col md:flex-row mb-6">
    <div class="md:mr-10 md:w-1/4 mb-4 md:mb-0">
      <img :src="imageToShow" alt="Post Image" class="w-full max-w-sm h-auto mb-4" />
      <div class="text-md text-gray-400 mb-4">
        <div>Status: {{ post.status }}</div>
        <div>Author: {{ post.meta.author || 'Unknown' }}</div>
        <div>Published: {{ formattedDate }}</div>
      </div>
    </div>
    <div>
      <h1 class="text-4xl font-bold mb-1">{{ post.title || 'Untitled Post' }}</h1>
      <div class="text-md mb-2">{{ post.headline }}</div>
      <div class="flex items-center mb-2">
        <img :src="`${platformIcon}`" alt="Platform Icon" class="w-6 h-6 mr-2" />
        <a :v-if="post.link" :href="post.link" target="_blank" class="accent-color hover:underline">
          {{ post.link }}
        </a>
      </div>
      <div v-if="post.meta.tags" class="text-md text-gray-400 mb-4">
        <span v-for="tag in post.meta.tags" :key="tag" class="mr-2">{{ tag }}</span>
      </div>
      <p v-html="cleanHtmlContent"></p>
    </div>
  </div>
</template>
