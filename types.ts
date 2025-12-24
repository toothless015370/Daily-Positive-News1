
export interface NewsArticle {
  id: string;
  headline: string;
  body: string;
  countries: string;
  created_at: string;
  categories: string[];
  views: number;
  imageUrl?: string;
}

export interface AuthResponse {
  access_token: string;
}

export type SortOption = 'newest' | 'oldest' | 'popular';
