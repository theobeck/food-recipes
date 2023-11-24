import { useState, useEffect } from 'react';
import './index.css';
import searchIcon from '../../assets/searchIcon.png';

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setSearchTerm }: SearchBarProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300); // Delay of 300 ms

    return () => clearTimeout(delayDebounce);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className="search-bar-container">
      <img src={searchIcon} alt="Search" />
      <input
        className="search-bar"
        id='searchBar'
        type="text"
        placeholder="Search"
        value={localSearchTerm}
        onChange={handleInputChange}
        autoFocus
      />
    </div>
  );
}