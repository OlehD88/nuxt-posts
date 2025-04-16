<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from '~/utils/general'
const postsStore = usePostsStore()

const searchQuery = ref(postsStore.filters.search || '')

const updateSearch = debounce((query: string) => {
  postsStore.updateFilters({ search: query })
}, 500)

defineExpose({
  clearInput: () => {
    searchQuery.value = ''
  },
})

const onInput = () => {
  updateSearch(searchQuery.value)
}
</script>

<template>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Search by title"
    class="w-full px-4 py-2 rounded-md outline-none border-1 border-(--secondary-color)"
    @input="onInput"
  />
</template>
