// RecipeListItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

// Defines an interface "Recipe" with information to represent a recipe'
interface Reviews {
  rating: number;
  comment: string;
}
interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  reviews: [Reviews];
}

// Defines the properties interface for the Filter component
interface RecipeListItemProps {
  recipe: Recipe;
}

// Defines the RecipeListItem component as a functional component
export default function RecipeListItem(props: RecipeListItemProps) {
  const { id, name, imageUrl, reviews } = props.recipe;

  //function to calculate the average rating of a recipe
  const AverageRating = () => {
    let sum = 0;
    if(reviews.length === 0) return "No reviews";
    reviews.forEach((review) => {
      sum += review.rating;
    });
    const average = sum / reviews.length;
    return average.toFixed(1);
  };

  // Shows the div element with the recipe information
  return (
    <div key={id}>
      <Link to={`/recipe/${id}`} className="recipe-link">
        <img src={imageUrl} alt={name} />
        <span className="recipe-name">{name}</span>
        <div className="ratingStars">
          <span className="rating-number">{AverageRating()}</span>
          <span className="rating-star">★</span>
        </div>
      </Link>
    </div>
  );
}
