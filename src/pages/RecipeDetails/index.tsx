import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeDetailsProps {
  recipes: Recipe[];
}

function RecipeDetails(props: RecipeDetailsProps) {
  const { id } = useParams<{ id: string | undefined }>();

  if (id === undefined) {
    return <div>Invalid URL: Recipe ID is missing.</div>;
  }

  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return <div>Invalid URL: Recipe ID is not a valid number.</div>;
  }

  const recipe = props.recipes.find((r) => r.id === parsedId);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.name}</h1>
      {/*    */}
      <p>{recipe.description}</p>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.instructions.map((instructions, index) => (
          <li key={index}>{instructions}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;
