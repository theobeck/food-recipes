// MainPage.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
}

interface MainPageProps {
  recipes: Recipe[];
}

function MainPage(props: MainPageProps) {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {props.recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <img src={recipe.imageUrl} alt={recipe.name} />
              {recipe.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
