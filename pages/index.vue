<script setup lang="ts">
import { PostCard } from '#components'

const { posts } = usePostsStore()
</script>

<template>
  <section>
    <div class="flex justify-center items-center flex-wrap">
      <div v-for="post in posts" :key="post.id" class="w-full sm:w-1/2 lg:w-1/3 p-4">
        <PostCard :post="post" />
      </div>
    </div>
  </section>
</template>
