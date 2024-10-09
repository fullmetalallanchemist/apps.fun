'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

const categories = ["All", "dotfun", "art", "entertainment", "music", "social"];

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-3 py-1 rounded-full ${
            activeCategory === category
              ? "bg-black text-white"
              : "bg-white text-black border border-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}