import { useState, useCallback } from 'react';
import { SearchState } from '../types/search';
import { generateSearchResults } from '../utils/gemini';
import { getUnsplashImages } from '../utils/unsplash';

const RESULTS_PER_PAGE = 10;

export function useSearch() {
  const [searchState, setSearchState] = useState<SearchState>({
    results: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    relatedImages: []
  });

  const searchCache = new Map<string, SearchState>();

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    // Check cache first
    if (searchCache.has(query)) {
      setSearchState(searchCache.get(query)!);
      return;
    }

    setSearchState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [content, relatedImages] = await Promise.all([
        generateSearchResults(query),
        getUnsplashImages(query)
      ]);
      
      const results = [{
        title: `${query.charAt(0).toUpperCase() + query.slice(1)} - Detailed Information`,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        snippet: content
      }];

      const newState = {
        results,
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: Math.ceil(results.length / RESULTS_PER_PAGE),
        relatedImages
      };

      searchCache.set(query, newState);
      setSearchState(newState);
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }));
    }
  }, []);

  const setPage = (page: number) => {
    setSearchState(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  return {
    ...searchState,
    search,
    setPage
  };
}