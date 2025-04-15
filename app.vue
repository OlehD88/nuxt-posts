<script lang="ts" setup>
const postsStore = usePostsStore()

await callOnce(postsStore.fetchPosts)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
