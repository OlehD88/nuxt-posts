<script lang="ts" setup>
import BaseDropdown from './BaseDropdown.vue'
const postsStore = usePostsStore()

const platformOptions = computed(() => {
  const options = postsStore.platforms.map((platform) => ({
    label: platform,
    value: platform,
  }))
  return [{ label: 'None', value: 'none' }, ...options]
})
const selectedOption = computed(() => postsStore.filters.platform)

const updatePlatformFilter = (value: string) => {
  postsStore.updateFilters({ platform: value === 'none' ? null : value })
}
</script>

<template>
  <BaseDropdown
    name="platform"
    placeholder-text="Select Platform"
    :options="platformOptions"
    :selected-option="selectedOption"
    @update:selected-option="updatePlatformFilter"
  />
</template>
