import { useParams } from 'react-router-dom';
import './index.css';
import BackButton from '../../components/BackButton';
import Review from '../../components/Review';
import ReactStars from 'react-stars';
import { useQuery } from '@apollo/client';
import GET_RECIPE from './queries';
import logo from '../../assets/recipesLogo.png';

type Review = {
  rating: number;
  comment: string;
};

function RecipeDetails() {
  // Import GraphQL query for fetching a single recipe
  const { name } = useParams<{ name: string | undefined }>();

  const id = parseInt(name || '0');

  // Apollo Client to fetch the recipe data
  const { loading, error, data, refetch } = useQuery(GET_RECIPE, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipe = data?.getRecipeById;

  // Show the details of the recipe selected
  return (
    <div className="recipe-details">
      <section className="nav">
        <BackButton />
        <a href={import.meta.env.BASE_URL}>
          <img id="logo" src={logo} alt="Recipes Logo" />
        </a>
        <a id="aboutUs" target="_blank" href="https://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUIcmlja3JvbGw%3D">
          {' '}
          About us
        </a>
      </section>

      <section className="recipe-header">
        <img className="header-item" src={recipe.imageUrl} alt={recipe.name} />

        <div className="header-item">
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
        </div>
      </section>

      <section className="recipe-body">
        <div id="ingredients">
          <h2>Ingredients:</h2>
          <ul>
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div id="instructions">
          <h2>Instructions:</h2>
          <ul className="instructionsList">
            {recipe.instructions.map((instructions: string, index: number) => (
              <li key={index}>{instructions}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="review">
        <div id="rating">
          <h2>Leave a rating!</h2>

          <div className="reviews" data-testid="reviews">
            <Review refetch={refetch} />
            <h3>Reviews</h3>
            <ul>
              {recipe.reviews.map((review: Review, index: number) => (
                <li key={index}>
                  <ReactStars value={review.rating} edit={false} /> {review.comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecipeDetails;

// const ratings: number[] = [];
//     cy.get('recipeListItem').each((recipe) => {
//       ratings.push(parseFloat(recipe.find('.rating-number').text()));
//     });
//     ratings.sort((a, b) => b - a);

// const sortedRecipes = [];
// cy.get('@recipeListItem').each((recipe) => {
//   sortedRecipes.push(recipe.find('.recipe-name').text());
// });
// console.log(sortedRecipes);
// sortedRecipes.sort((a, b) => a.localeCompare(b));
// console.log(sortedRecipes);

// let i = 0;
// cy.get('@recipeListItem').each((recipe) => {
//   cy.wrap(recipe).should('contain.text', sortedRecipes[i]);
//   i++;
// });

// for (let i = 0; i < sortedRecipes.length; i++) {
//   cy.get('@recipeListItem').eq(i).should('contain.text', sortedRecipes[i]);
// }
