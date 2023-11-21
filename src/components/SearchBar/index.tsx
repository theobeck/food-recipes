import React, { useState } from 'react';
import './index.css';
import searchIcon from '../../assets/searchIcon.png';

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setSearchTerm }: SearchBarProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search"
        value={localSearchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      <button onClick={handleSearch}>
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  );
}


