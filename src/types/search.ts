export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  didYouMean?: string;
  relatedImages: string[];
}