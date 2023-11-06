import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import BackButton from '../../components/BackButton';
import Review from '../../components/Review';
import ReactStars from 'react-stars';

interface ReviewObject {
  rating: number;
  comment: string;
}


// Define the properties interface for the RecipeDetails component
interface RecipeDetailsProps {
  recipes: {
    id: number;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  reviews: ReviewObject[];
}[];
}

// Define the RecipeDetails functional component to show a recipe with its details
function RecipeDetails(props: RecipeDetailsProps) {
  const { id } = useParams<{ id: string | undefined }>();

  // Check if if "id" is valid
  if (id === undefined) {
    return <div>Invalid URL: Recipe ID is missing.</div>;
  }

  // Parse "id" as an integer
  const parsedId = parseInt(id, 10);

  // Check if the parsed "id" is valid
  if (isNaN(parsedId)) {
    return <div>Invalid URL: Recipe ID is not a valid number.</div>;
  }

  // Find matching recipe by "id" from the list of recipes
  const recipe = props.recipes.find((r) => r.id === parsedId);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  // Show the details of the recipe selected
  return (
    <>
    <BackButton />
    <div className="recipe-details">
      <section className='recipe-header'>
        <img className="header-item" src={recipe.imageUrl} alt={recipe.name}/>
        <div className='header-item'>
          <h1>{recipe.name}</h1>
          <h2>Ingredients:</h2>
          <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        </div>
      </section>

      <section className='recipe-body'>

        
        <p>{recipe.description}</p>
        <h2>Instructions:</h2>
        <ul className='instructions'>
          {recipe.instructions.map((instructions, index) => (
            <li key={index}>{instructions}</li>
          ))}
        </ul>
        <div className="review">
          <Review />
          
          <h2>Reviews</h2>
          <ul>
            {recipe.reviews.map((review, index) => (
              <li key={index}>
              <ReactStars count={5} value={review.rating} edit={false} /> - {review.comment}
            </li>
            ))}
          </ul>
          </div>
        </section>
    </div>
    </>
  );
}

export default RecipeDetails;
