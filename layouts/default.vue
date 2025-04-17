<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
const postsStore = usePostsStore()
// This is a placeholder for the error handler
// In a real application, you might want to log the error to an external service
const errorHandler = (error: unknown) => {
  console.error('An error occurred:', error)
}
</script>

<template>
  <NuxtErrorBoundary @error="errorHandler">
    <div>
      <AppHeader />
      <main class="my-8 flex justify-center">
        <div class="container">
          <div v-if="postsStore.loading" class="text-center">
            <img src="/images/spinner.svg" alt="Loading..." class="w-32 h-32 mx-auto mt-12" />
          </div>
          <div v-show="!postsStore.loading">
            <NuxtPage />
          </div>
        </div>
      </main>
    </div>
  </NuxtErrorBoundary>
</template>
