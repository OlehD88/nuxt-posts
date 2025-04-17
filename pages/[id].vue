<script setup lang="ts">
import { useRoute } from 'vue-router'
import { PostInfo } from '#components'
import { usePostsStore } from '~/stores/posts'

const route = useRoute()
const postsStore = usePostsStore()

const postId = Number(route.params.id)
const post = computed(() => postsStore.posts.find((p) => p.id === postId))
</script>

<template>
  <section class="p-6 max-w-6xl mx-auto">
    <PostInfo v-if="post" :post="post" />
    <div v-else class="text-center">
      <p>
        Post not found. Please check the URL or go back to the
        <NuxtLink to="/" class="accent-color">homepage</NuxtLink>.
      </p>
    </div>
  </section>
</template>
