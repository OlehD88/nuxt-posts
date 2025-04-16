<script lang="ts" setup>
const postsStore = usePostsStore()

callOnce(postsStore.fetchPosts)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
