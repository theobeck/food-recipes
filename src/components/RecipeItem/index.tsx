import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface Reviews {
  rating: number;
  comment: string;
}

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  reviews: Reviews[];
}

interface RecipeListItemProps {
  recipe: Recipe;
}

export default function RecipeListItem({ recipe }: RecipeListItemProps) {
  const { id, name, imageUrl, reviews } = recipe;

  const averageRating = useMemo(() => {
    let sum = 0;
    if (reviews.length === 0) return 'No reviews';
    reviews.forEach(review => {
      sum += review.rating;
    });
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div>
      <Link to={`${import.meta.env.BASE_URL}/recipe/${id}`} className="recipe-link">
        <img src={imageUrl} alt={name} />

        <div className="overlay">
          <span className="recipe-name">{name}</span>
          <div className="ratingStars">
             <span className="rating-number">{averageRating}</span>
            <span className="rating-star">★</span>
          </div>

        </div>

      </Link>
    </div>
  );
}