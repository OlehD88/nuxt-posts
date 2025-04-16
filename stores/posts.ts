import type { Platform, Post } from '~/types/posts'

type Filters = {
  platform: string | null
  search: string | null
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
    updateQueryFilterParams(filters: Partial<Record<keyof Filters, string | null>>) {
      const { query } = useRoute()
      const router = useRouter()
      const updatedQuery = { ...query }

      const keys = Object.keys(filters) as Array<keyof Filters>
      keys.forEach((key) => {
        const value = filters[key]
        if (!value) {
          delete updatedQuery[key]
        } else {
          updatedQuery[key] = value
        }
      })

      router.replace({ query: updatedQuery })
    },
    updateFilters(filters: Partial<Record<keyof Filters, string | null>>) {
      this.updateQueryFilterParams(filters)
      this.filters = {
        ...this.filters,
        ...filters,
      }
    },
    clearFilters() {
      this.updateFilters({
        platform: null,
        search: '',
      })
    },
  },
})
