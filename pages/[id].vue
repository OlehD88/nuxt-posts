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
</script>

<template>
  <section class="p-6 max-w-6xl mx-auto">
    <div v-if="post">
      <div class="flex flex-col-reverse md:flex-row mb-6">
        <div class="md:mr-8">
          <div>Images</div>
          <div class="text-sm text-gray-500 mb-4">
            <div>Status: {{ post.status }}</div>
            <div>Author: {{ post.meta.author || 'Unknown' }}</div>
            <div>Published: {{ formattedDate }}</div>
          </div>
        </div>
        <div>
          <h1 class="text-4xl font-bold mb-1">{{ post.title || 'Untitled Post' }}</h1>
          <div class="text-md">{{ post.headline }}</div>
          <div class="flex items-center mt-2">
            <img :src="`${platformIcon}`" alt="Platform Icon" class="w-6 h-6 mr-2" />
            <a
              :v-if="post.link"
              href="post.link"
              target="_blank"
              class="accent-color hover:underline"
            >
              {{ post.link }}
            </a>
          </div>
          <div>
            <span v-for="tag in post.meta.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
      <div>
        <p v-html="cleanHtmlContent"></p>
      </div>
    </div>

    <div v-else class="text-center">
      <p>Post not found. Please check the URL or go back to the homepage.</p>
    </div>
  </section>
</template>
