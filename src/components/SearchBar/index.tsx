import React, { useState } from 'react';
import './index.css';

// Define the properties interface for the SearchBar component
interface SearchBarProps {
  onChange: (searchTerm: string) => void;
}

// Define the SearchBar functional component
export default function SearchBar(props: SearchBarProps) {
  const { onChange } = props;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    onChange(searchTerm);
  };

  // Show the SearchBar component
  return <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />;
  
}

