import React from 'react';

interface SearchAndSortProps {
  searchValue: string;
  sortValue: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({ searchValue, sortValue, onSearchChange, onSortChange }) => (
  <div className="flex items-center gap-4 mb-4">
    <input
      type="text"
      placeholder="Search products..."
      value={searchValue}
      className="border p-2 rounded-md w-full"
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <select
      value={sortValue}
      className="border p-2 rounded-md"
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  </div>
);

export default SearchAndSort;