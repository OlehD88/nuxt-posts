export enum Platform {
  Facebook = 'Facebook',
  LinkedIn = 'LinkedIn'
}

export type Post = {
    id: number,
    platform: Platform,
    title?: string,
    status: string, // "draft" | "published" | "archived" | "scheduled"
    headline?: string,
    content: string 
    published_date?: string, // Date string format | "Invalid date" | null
    link?: string,
    meta: {
      author?: string,
      tags?: string[],
      images?: {
        url: string,
        alt: string
      }[]
    }
}