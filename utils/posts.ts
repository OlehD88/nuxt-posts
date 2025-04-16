import { Platform } from '~/types/posts'

const platformIcons = {
  [Platform.Facebook]: 'facebook-icon.svg',
  [Platform.LinkedIn]: 'linkedin-icon.svg',
}

export const getPlatformIconURL = (platform?: string) => {
  const unkownPlatformIconFileName = 'Unknown platform icon file name'
  const iconsFolderPath = '/icons/'
  const iconName = platformIcons[platform as Platform] || unkownPlatformIconFileName
  return `${iconsFolderPath}${iconName}`
}
