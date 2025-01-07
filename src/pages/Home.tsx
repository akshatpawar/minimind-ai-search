import React from 'react';
import { SearchBox } from '../components/SearchBox';
import { Brain, Moon, Sun } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useTheme } from '../hooks/useTheme';

export function Home() {
  const { search } = useSearch();
  const { isDark, toggle } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <div className="absolute top-4 right-6">
        <button
          onClick={toggle}
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center">
          <Brain size={64} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
          <span className={`text-4xl ml-2 font-medium ${isDark ? 'text-white' : 'text-black'}`}>MiniMind</span>
        </div>
        <p className={`mt-2 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Big brain, small answers</p>
      </div>
      <SearchBox onSearch={search} isDark={isDark} />
    </div>
  );
}