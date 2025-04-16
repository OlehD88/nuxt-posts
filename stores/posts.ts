import type { Post } from '~/types/posts'

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await $fetch<Post[]>('/api/posts')
        this.posts = response
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
