import RecipeListItem from "../../components/RecipeItem";
import './index.css';
import React, { useState } from 'react';

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
}

interface MainPageProps {
  recipes: Recipe[];
  itemsPerPage: number;
}

function MainPage({ recipes, itemsPerPage }: MainPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const loadMore = () => setCurrentPage(currentPage + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRecipes = recipes.slice(0, endIndex);

  return (
    <div className="main-page">
      <div className="container">
        <h1>Recipes</h1>
        <ul className="recipe-link">
          {displayedRecipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))}
        </ul>
        {displayedRecipes.length < recipes.length && (
          <button onClick={loadMore}>Load More</button>
        )}
      </div>
    </div>
  );
}

export default MainPage;