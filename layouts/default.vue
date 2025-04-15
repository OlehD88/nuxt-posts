<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div>
    <AppHeader />
    <main class="my-8 flex justify-center">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>
