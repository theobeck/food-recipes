import React from 'react';
import recipesData from '../Mockup-data.json';

interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipesData.recipes.map((recipe: Recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
