// Nuxt 3 middleware to preserve query parameters when navigating between pages
// In the future maybe remove global part from it
// For now, it is good to have it globally
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query.skipPreserve) {
    delete to.query.skipPreserve
    return
  }
  if (!Object.keys(to.query).length && Object.keys(from.query).length) {
    return navigateTo({
      path: to.path,
      query: from.query,
    })
  }
})
