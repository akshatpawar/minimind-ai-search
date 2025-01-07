import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBoxProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  compact?: boolean;
  isDark?: boolean;
}

export function SearchBox({ initialQuery = '', onSearch, compact = false, isDark = false }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLucky = () => {
    window.open("https://akshatpawar.pages.dev/", "_blank");
  };

  return (
    <div className={`w-full ${compact ? 'max-w-full' : 'max-w-2xl'}`}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full px-10 py-3 rounded-full border focus:outline-none focus:ring-1 shadow-sm ${
              isDark 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-gray-600 focus:ring-gray-600'
                : 'bg-white border-gray-200 text-gray-900 focus:border-gray-300 focus:ring-gray-300'
            }`}
            placeholder="Search..."
          />
        </div>
        
        {!compact && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded hover:shadow-md ${
                isDark
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleLucky}
              className={`px-6 py-2 rounded hover:shadow-md ${
                isDark
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              I'm Feeling Lucky
            </button>
          </div>
        )}
      </form>
    </div>
  );
}