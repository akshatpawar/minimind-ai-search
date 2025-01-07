import React from 'react';

interface ImageSidebarProps {
  images: string[];
  query: string;
  isDark?: boolean;
}

export function ImageSidebar({ images, query, isDark = false }: ImageSidebarProps) {
  return (
    <div className="w-80 pl-8 hidden lg:block">
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
  );
}