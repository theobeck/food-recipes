import RecipeListItem from "../../components/RecipeItem";
import Filter from "../../components/Filter";
import './index.css';
import React, { useState } from 'react';
import { Option } from "react-dropdown";

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
        <div className= "filterAndSearch">

        {/*Adding a proper search bar in next iteration*/}
        <input type="text" placeholder="Search" />
        
        <Filter onChange={(option: Option) => console.log(option)} />
        </div>
        <div className="recipe-link">
          {displayedRecipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
        {displayedRecipes.length < recipes.length && (
          <button id = "loadMore" onClick={loadMore}>Load More</button>
        )}
      </div>
    </div>
  );
}

export default MainPage;