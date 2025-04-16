<script lang="ts" setup>
import BaseDropdown from './BaseDropdown.vue'
const postsStore = usePostsStore()

const platformOptions = postsStore.platforms.map((platform) => ({
  label: platform,
  value: platform,
}))
const optionsWithNone = [{ label: 'None', value: 'none' }, ...platformOptions]
const selectedOption = computed(() => postsStore.filters.platform)

const updatePlatformFilter = (value: string | null) => {
  if (value === 'none') {
    value = null
  }
  postsStore.updateFilters({ platform: value })
}
</script>

<template>
  <BaseDropdown
    name="platform"
    placeholder-text="Select Platform"
    :options="optionsWithNone"
    :selected-option="selectedOption"
    @update:selected-option="updatePlatformFilter"
  />
</template>
