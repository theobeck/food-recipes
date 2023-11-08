import React from 'react';
import './index.css';

// Define the properties interface for the SearchBar component
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

// Define the SearchBar functional component
export default function SearchBar(props: SearchBarProps) {
  const { searchTerm, setSearchTerm } = props;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  // Show the SearchBar component
  return <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />;
  
}

