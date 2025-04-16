<script setup lang="ts">
import { PostCard, SearchInput, PlatformDropdown } from '#components'

const { posts } = usePostsStore()
const navigateToPostPage = (postId: number) => {
  navigateTo(`/${postId}`)
}
const handlePostsSearch = (query: string) => {
  console.log('Search query:', query)
}
</script>

<template>
  <section>
    <div class="p-4 flex justify-start items-center gap-2">
      <SearchInput @update:query="handlePostsSearch" />
      <PlatformDropdown />
    </div>
    <div class="flex justify-center items-start flex-wrap">
      <div v-for="post in posts" :key="post.id" class="w-full sm:w-1/2 lg:w-1/3 p-4">
        <PostCard :post="post" @:click="navigateToPostPage(post.id)" />
      </div>
    </div>
  </section>
</template>
