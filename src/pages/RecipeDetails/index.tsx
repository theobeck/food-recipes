import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import BackButton from '../../components/BackButton';
import Review from '../../components/Review';

interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  reviews: string[];
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
    <>
    <BackButton />
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
      <h2>Instructions:</h2>
      <ul className='instructions'>
        {recipe.instructions.map((instructions, index) => (
          <li key={index}>{instructions}</li>
        ))}
      </ul>
      <div className="review">
      <p>Review</p>
        <Review />
        
        <h2>Reviews</h2>
        <ul>
          {recipe.reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
        </div>
    </div>
    </>
  );
}

export default RecipeDetails;
