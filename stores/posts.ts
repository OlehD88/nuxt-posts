import type { Platform, Post } from '~/types/posts'

type Filters = {
  platform: string | null
  search: string
}

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    posts: [] as Post[],
    platforms: [] as Platform[],
    filters: {
      platform: null,
      search: '',
    } as Filters,
    loading: false,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await $fetch<Post[]>('/api/posts')
        this.posts = response

        const uniqPlatforms = new Set(response.map((post) => post.platform))
        this.platforms = Array.from(uniqPlatforms)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        this.loading = false
      }
    },
    updateFilters(newFilters: Partial<Filters>) {
      this.filters = {
        ...this.filters,
        ...newFilters,
      }
    },
  },
})
