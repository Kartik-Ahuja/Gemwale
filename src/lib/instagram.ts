import axios from 'axios';

// Replace with your actual values from Instagram Graph API
const INSTAGRAM_BUSINESS_ACCOUNT_ID = import.meta.env.VITE_INSTAGRAM_ACCOUNT_ID || '';
const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || '';

export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

/**
 * Fetch recent Instagram posts
 * @param limit - Number of posts to fetch (default: 5)
 */
export async function getInstagramPosts(limit: number = 5): Promise<InstagramPost[]> {
  if (!INSTAGRAM_BUSINESS_ACCOUNT_ID || !INSTAGRAM_ACCESS_TOKEN) {
    console.warn('Instagram API credentials not configured. Please set VITE_INSTAGRAM_ACCOUNT_ID and VITE_INSTAGRAM_ACCESS_TOKEN in .env.local');
    return [];
  }

  try {
    const response = await axios.get(
      `https://graph.instagram.com/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
      {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,timestamp',
          access_token: INSTAGRAM_ACCESS_TOKEN,
          limit: limit,
        },
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}

/**
 * Get video thumbnail from Instagram video post
 */
export function getPostThumbnail(post: InstagramPost): string {
  // For videos, Instagram provides media_url as thumbnail
  // For images and carousels, media_url is the actual image
  return post.media_url;
}
