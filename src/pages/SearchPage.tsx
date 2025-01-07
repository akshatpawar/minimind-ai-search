import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBox } from '../components/SearchBox';
import { SearchResults } from '../components/SearchResults';
import { ImageSidebar } from '../components/ImageSidebar';
import { useSearch } from '../hooks/useSearch';
import { Brain, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, loading, error, currentPage, totalPages, relatedImages, search, setPage } = useSearch();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <header className={`border-b sticky top-0 z-10 ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center mr-8">
              <Brain size={32} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
              <span className={`text-xl ml-2 font-medium ${isDark ? 'text-white' : 'text-black'}`}>MiniMind</span>
            </a>
            <div className="flex-1">
              <SearchBox initialQuery={query} onSearch={search} compact isDark={isDark} />
            </div>
            <button
              onClick={toggle}
              className={`ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className={`text-red-500 text-center ${isDark ? 'text-red-400' : ''}`}>{error}</div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="flex">
            <SearchResults
              results={results}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              isDark={isDark}
              images={relatedImages}
              query={query}
            />
            <ImageSidebar images={relatedImages} query={query} isDark={isDark} />
          </div>
        )}
      </main>
    </div>
  );
}