<script setup lang="ts">
import { ref } from 'vue'
import { PostCard, SearchInput, PlatformDropdown } from '#components'

const postsStore = usePostsStore()
const searchInputRef = ref<InstanceType<typeof SearchInput> | null>(null)

const someFiltersAvailable = computed(() => {
  const { search, platform } = postsStore.filters
  return search || platform
})

const filteredPosts = computed(() => {
  if (!someFiltersAvailable.value) return postsStore.posts

  const { search, platform } = postsStore.filters

  return postsStore.posts.filter((post) => {
    const matchesSearch = search ? post.title?.toLowerCase().includes(search.toLowerCase()) : true
    const matchesPlatform = platform ? post.platform === platform : true
    return matchesSearch && matchesPlatform
  })
})

const navigateToPostPage = (postId: number) => {
  navigateTo(`/${postId}`)
}

const onClearFilters = () => {
  postsStore.clearFilters()
  searchInputRef?.value?.clearInput()
}
const showNoResults = computed(() => {
  return filteredPosts.value.length === 0 && !postsStore.loading
})
</script>

<template>
  <section>
    <div class="p-4 flex flex-col sm:flex-row justify-start items-center gap-2 md:gap-4">
      <div class="w-full sm:w-1/3 max-w-md">
        <SearchInput ref="searchInputRef" />
      </div>
      <div class="w-full sm:w-1/3 max-w-3xs">
        <PlatformDropdown />
      </div>
      <div v-if="someFiltersAvailable">
        <button
          class="bg-(--secondary-color) py-2 px-4 rounded-md cursor-pointer hover:bg-transparent hover:border-1 hover:border-(--secondary-color) text-white"
          @click="onClearFilters"
        >
          Clear filters
        </button>
      </div>
    </div>
    <div class="flex justify-start items-start flex-wrap">
      <div v-for="post in filteredPosts" :key="post.id" class="w-full sm:w-1/2 lg:w-1/3 p-4">
        <PostCard :post="post" @:click="navigateToPostPage(post.id)" />
      </div>
      <div v-if="showNoResults" class="text-center text-xl w-full p-4">
        No results found for the selected filters. Please adjust your filters and try again.
      </div>
    </div>
  </section>
</template>
