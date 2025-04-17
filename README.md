# Nuxt Posts

This is a platform for managing and filtering posts. It allows users to search for posts by title, filter them by platform, and view detailed information about each post. The app dynamically updates the displayed posts based on the selected filters.

## Current Features

- 🧩 Show all available posts from API GET call (currently posts are stored in JSON file)
- 🧩 Show all information on post page when you click on post card
- 🧩 Filtering by Platform (currently there are Facebook and LinkedIn)
- 🧩 Searching by post's title

## Start a project

For starting a project you need to do these 2 steps:

1. First run `npm install` to install node packages.
2. Then just run `npm run dev` and you should be good to go.

## Some decisions explanations

- I created a new API endpoint for fetching posts from a JSON file. I added a small delay to the Promise resolution to simulate a real server API call.
- Since the app is currently small, I added the Loading component directly to the default layout. If the app grows or more API calls are added, it could be moved to a more appropriate part of the application.
- The main logic related to post filtering, updating filters, and fetching posts is placed in the Pinia posts store.
- I created a base component for the dropdown and used it inside the Platform Dropdown. This was done with future scalability in mind, as there may be other filter dropdowns in the future. A similar approach could be applied to the Search Input (creating a BaseInput component). However, since there are no other input components at the moment, I decided not to create a separate Base Input component.
- As the app is currently small, all components are stored directly in the components folder. In the future, if the app grows and more pages are added, it would be better to create a separate folder for base components and move page-specific components to their respective page folders.
- I created a separate utils folder and grouped helper functions by topic.
- For types, I created a separate folder. For the platform, I used an enum. If the platform value in the post response becomes more unpredictable, it might be better to transform it into a string type. I also considered creating an enum or union type for the status field. However, since there is currently no logic related to status, I left it as a string.
- For the post's content, I added a new package called DOMPurify to sanitize the HTML coming from the content field of posts. This is important because the content could potentially contain dangerous code, such as scripts that could lead to XSS (Cross-Site Scripting) attacks. While I didn't add a specific configuration for DOMPurify in this project, in a real-world application, it would be advisable to configure it properly and define a whitelist of allowed tags and attributes to ensure maximum security.
- Currently, the links to the images are not real, so I added a placeholder image to the post page.
- I added a router middleware to save query parameters on each navigation. This ensures that query parameters are preserved across route changes. I also considered creating a utility function for navigateTo that automatically includes the saved query parameters. For now, I decided to keep the global middleware as it works well for the current app structure. However, as the app grows and includes more pages, this logic should either be moved to the relevant pages or replaced with a more scalable solution.

## Future improvements

- [ ] Add an alternative list view for posts (e.g., a table view) on the main page, along with a toggle button to switch between views.
- [ ] Enhance the search functionality with more advanced logic, such as fuzzy search. Additionally, allow searching by other fields like author, headline, or tags, not just the title.
- [ ] Introduce filtering by post status to provide more refined filtering options.
- [ ] Implement pagination or lazy loading to handle a larger number of posts efficiently.
- [ ] Add a sorting feature to allow users to sort posts by various criteria, such as date, platform, author, or title.
- [ ] Add a proper image gallery with consistent image sizes and an optional slider for better navigation and user experience. This will ensure that images are displayed uniformly and provide a more interactive way to browse through multiple images.
- [ ] Write unit tests for key components and utility functions to ensure code reliability and maintainability.
- [ ] Integrate Storybook to create a component library for better documentation and reusability.

## Technology Used

- ✅ TypeScript
- ✅ Vue.js
- ✅ Nuxt
- ✅ Pinia
- ✅ Tailwind
