<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
const postsStore = usePostsStore()
</script>

<template>
  <div>
    <AppHeader />
    <main class="my-8 flex justify-center">
      <div class="container">
        <div v-if="postsStore.loading" class="text-center">
          <img src="/images/spinner.svg" alt="Loading..." class="w-32 h-32 mx-auto mt-12" />
        </div>
        <slot v-else />
      </div>
    </main>
  </div>
</template>
