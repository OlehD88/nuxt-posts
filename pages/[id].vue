<script setup lang="ts">
import { useRoute } from 'vue-router'
import DOMPurify from 'dompurify'
import { usePostsStore } from '~/stores/posts'
import { getFormattedPostDate } from '~/utils/date'

const route = useRoute()
const postsStore = usePostsStore()

const postId = Number(route.params.id)
const post = postsStore.posts.find((p) => p.id === postId)
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
  <section class="p-6 max-w-6xl mx-auto">
    <div v-if="post">
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
            <a
              :v-if="post.link"
              :href="post.link"
              target="_blank"
              class="accent-color hover:underline"
            >
              {{ post.link }}
            </a>
          </div>
          <div v-if="post.meta.tags" class="text-md text-gray-400 mb-4">
            <span v-for="tag in post.meta.tags" :key="tag" class="mr-2">{{ tag }}</span>
          </div>
          <p v-html="cleanHtmlContent"></p>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p>
        Post not found. Please check the URL or go back to the
        <NuxtLink to="/" class="accent-color">homepage</NuxtLink>.
      </p>
    </div>
  </section>
</template>
