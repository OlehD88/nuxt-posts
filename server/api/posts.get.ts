import postsData from '~/data/social_posts_large.json'
import type { Post } from '~/types/posts'

// This is a mock API endpoint that simulates fetching posts data from a server.
const getPosts = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(postsData as Post[])
    }, 500)
  })
}

export default defineEventHandler(async () => {
  const postsData = await getPosts()
  return postsData
})
