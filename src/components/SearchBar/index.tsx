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
  return <input className="searchBar" type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />;
}

// import React from 'react';
// import RecipeItem from '../RecipeItem';
// import { Recipe } from '../../types';

// // Define the properties interface for the RecipeList component
// interface RecipeListProps {
//     recipes: Recipe[];
//     searchTerm: string;
// }

// // Define the RecipeList functional component
// export default function RecipeList(props: RecipeListProps) {
//     const { recipes, searchTerm } = props;

//     // Filter the recipes based on the search term
//     const filteredRecipes = recipes.filter((recipe) =>
//         recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Show the RecipeList component
//     return (
//         <div className="recipeList">
//             {filteredRecipes.map((recipe) => (
//                 <RecipeItem key={recipe.id} recipe={recipe} />
//             ))}
//         </div>
//     );
// }
