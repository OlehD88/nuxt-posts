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
        this.setInitFiltersFromURL()
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        this.loading = false
      }
    },
    setInitFiltersFromURL() {
      const queryString = window?.location.search
      const urlParams = new URLSearchParams(queryString)
      const platform = urlParams.get('platform')
      const search = urlParams.get('search')
      const platformIsValid = this.platforms.includes(platform as Platform)

      this.filters = {
        platform: platformIsValid ? platform : null,
        search: search || '',
      }
    },
    updateQueryFilterParams(param: keyof Filters, value: string | null) {
      const { query } = useRoute()
      const router = useRouter()
      const updatedQuery = { ...query }

      if (!value) {
        delete updatedQuery[param]
      } else {
        updatedQuery[param] = value
      }
      router.replace({ query: updatedQuery })
    },
    updateFilters(filter: keyof Filters, value: string | null) {
      this.updateQueryFilterParams(filter, value)
      this.filters = {
        ...this.filters,
        [filter]: value,
      }
    },
  },
})
