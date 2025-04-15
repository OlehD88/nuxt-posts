<script setup lang="ts">
import { PostCard } from '#components'

const { posts } = usePostsStore()
const navigateToPostPage = (postId: number) => {
  navigateTo(`/${postId}`)
}
</script>

<template>
  <section>
    <div class="flex justify-center items-start flex-wrap">
      <div v-for="post in posts" :key="post.id" class="w-full sm:w-1/2 lg:w-1/3 p-4">
        <PostCard :post="post" @:click="navigateToPostPage(post.id)" />
      </div>
    </div>
  </section>
</template>
