import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import BackButton from '../../components/BackButton';
import Review from '../../components/Review';
import ReactStars from 'react-stars';
import { useQuery } from '@apollo/client';
import GET_RECIPE from './queries';

type Review = {
  rating: number;
  comment: string;
};

function RecipeDetails() {
// Import GraphQL query for fetching a single recipe
  const { name } = useParams<{ name: string | undefined }>();

  const id = parseInt(name || '0');
  

  console.log(id);

    // Apollo Client to fetch the recipe data
    const { loading, error, data } = useQuery(GET_RECIPE, {
      variables: { id: id },
    });

    console.log(data);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  

  const recipe = data?.getRecipeById; 
  console.log(recipe);

  // Show the details of the recipe selected
  return (
    <>
      <BackButton />
      <div className="recipe-details">
        <section className='recipe-header'>
          <img className="header-item" src={recipe.imageUrl} alt={recipe.name} />
          <div className='header-item'>
            <h1>{recipe.name}</h1>
            <h2>Ingredients:</h2>
            <ul>
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className='recipe-body'>
          <p>{recipe.description}</p>
          <h2>Instructions:</h2>
          <ul className='instructions'>
            {recipe.instructions.map((instructions: string, index:number) => (
              <li key={index}>{instructions}</li>
            ))}
          </ul>
          <div className="review">
            <Review />
            <h2>Reviews</h2>
            <ul>
              {recipe.reviews.map((review: Review, index:number) => (
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
