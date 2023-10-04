// RecipeListItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
}

interface RecipeListItemProps {
  recipe: Recipe;
}

export default function RecipeListItem(props: RecipeListItemProps) {
  const { id, name, imageUrl } = props.recipe;

  return (
    <li key={id}>
      <Link to={`/recipe/${id}`} className="recipe-link">
        <img src={imageUrl} alt={name} />
        <span className="recipe-name">{name}</span>
      </Link>
    </li>
  );
}
