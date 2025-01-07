import React from 'react';
import { SearchResult } from '../types/search';
import { ImageSidebar } from './ImageSidebar';

interface SearchResultsProps {
  results: SearchResult[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDark?: boolean;
  images: string[];
  query: string;
}

function formatContent(content: string): string {
  return content
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\* (.*$)/gm, '• $1')
    .replace(/\n/g, '<br/>');
}

export function SearchResults({ 
  results, 
  currentPage, 
  totalPages, 
  onPageChange, 
  isDark = false,
  images,
  query 
}: SearchResultsProps) {
  const startIndex = (currentPage - 1) * 10;
  const displayedResults = results.slice(startIndex, startIndex + 10);

  return (
    <div className="flex-1">
      <div className="space-y-8 prose prose-slate max-w-none dark:prose-invert">
        {displayedResults.map((result, index) => (
          <div key={index} className="max-w-3xl">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{result.url}</div>
            <h3 className={`text-xl hover:underline mt-1 mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <a href={result.url}>{result.title}</a>
            </h3>
            
            {/* Mobile Images Section */}
            <div className="lg:hidden mb-6">
              <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Images related to "{query}"
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <a 
                    key={index} 
                    href={image} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
                      isDark ? 'shadow-gray-800' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${query} related image ${index + 1}`}
                      className="w-full h-32 object-cover hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div 
              className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              dangerouslySetInnerHTML={{ 
                __html: formatContent(result.snippet)
              }}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-4 mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === i + 1
                  ? isDark 
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}