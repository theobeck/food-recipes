// RecipeListItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

// Defines an interface "Recipe" with information to represent a recipe
interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
}

// Define the properties interface for the Filter component
interface RecipeListItemProps {
  recipe: Recipe;
}

// Define the RecipeListItem component as a functional component
export default function RecipeListItem(props: RecipeListItemProps) {
  const { id, name, imageUrl } = props.recipe;

  // Show the div element with the recipe information
  return (
    <div key={id}>
      <Link to={`/recipe/${id}`} className="recipe-link">
        <img src={imageUrl} alt={name} />
        <span className="recipe-name">{name}</span>
      </Link>
    </div>
  );
}
