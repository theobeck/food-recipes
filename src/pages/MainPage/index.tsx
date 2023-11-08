import RecipeListItem from '../../components/RecipeItem';
import Sort from '../../components/Sort';
import SearchBar from '../../components/SearchBar';
import './index.css';
import { useState } from 'react';
import { Option } from 'react-dropdown';
import { useQuery } from '@apollo/client';
import GET_ALL_RECIPES from './queries';
import { GET_VEGETARIAN_RECIPES } from './queries';
import logo from '../../assets/recipesLogo.png';
import searchIcon from '../../assets/searchIcon.png';
import cooking from '../../assets/cooking.jpg';

// Define an interface "Recipe" that is representing a recipe
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

// Defines the properties interface for the main page
interface MainPageProps {
  itemsPerPage: number;
}

// Defines the main page functional component that displays the recipes
function MainPage({ itemsPerPage }: MainPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [vegetarian, setVegetarian] = useState(false);

  // function to load more recipes
  const loadMore = () => setCurrentPage((currentPage) => currentPage + 2);

  const allResult = useQuery(GET_ALL_RECIPES, {
    // Use for filters and pagination
    variables: { offset: 0, limit: currentPage * itemsPerPage },
  });

  const vegetarianResult = useQuery(GET_VEGETARIAN_RECIPES, {
    // Use for filters and pagination
    variables: { offset: 0, limit: currentPage * itemsPerPage },
  });

  const loading = vegetarian ? vegetarianResult.loading : allResult.loading;
  const error = vegetarian ? vegetarianResult.error : allResult.error;
  const data = vegetarian ? vegetarianResult.data : allResult.data;

  //TODO: FETCH MORE

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const averageRating = (reviews: Reviews[]): number => {
    let sum = 0;
    if (reviews.length === 0) return 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    return sum / reviews.length;
  };

  // function to sort recipes by highest rating
  const sortRecipesByHighestRating = (recipes: Recipe[]) => {
    recipes.sort((a, b) => {
      // Find the highest rating for each recipe
      const highestRatingA = averageRating(a.reviews);
      const highestRatingB = averageRating(b.reviews);
      // Compare the highest ratings
      return highestRatingB - highestRatingA;
    });
    return recipes;
  };

  // function to sort recipes by alphabetical order
  const sortRecipesByAlphabeticalOrder = (recipes: Recipe[]) => {
    return recipes.sort((a, b) => a.name.localeCompare(b.name));
  };

  // Get all the recipes from the database
  const recipes = (vegetarian ? data?.getAllVegetarianRecipes : data?.getAllRecipes) || [];

  // Sort the recipes based on the selected sort option
  let sortedRecipes = [...recipes];
  if (selectedSort === 'highest-rating') {
    sortedRecipes = sortRecipesByHighestRating(sortedRecipes);
  } else if (selectedSort === 'alphabetical-order') {
    sortedRecipes = sortRecipesByAlphabeticalOrder(sortedRecipes);
  }

  // Filter the recipes based on the search term
  const filteredRecipes = sortedRecipes.filter((recipe: Recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate the start and end index of the recipes to be displayed
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRecipes = filteredRecipes.slice(0, endIndex);
  // const displayedRecipes = sortedRecipes.slice(startIndex, endIndex);

  // Show the main page
  return (
    <div className="main-page">
      <section className="nav">
        <a href={import.meta.env.BASE_URL}>
          <img id="logo" src={logo} alt="Recipes Logo" />
        </a>
        <a id="aboutUs" target="_blank" href="https://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUIcmlja3JvbGw%3D">
          About us
        </a>
      </section>

      <section className="header">
        <div id="headerDiv">
          <p>What do you feel like making:</p>

          <div className="search">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button>
              <img src={searchIcon} />
            </button>
          </div>
        </div>

        <img id="headerImg" src={cooking} alt="cooking image" />
      </section>

      <div className="container">
        <div id="containerHeader">
          <p>Latest and greatest</p>
          <div className="filter">
            <label htmlFor="vegetarian">Vegetarian</label>
            <input
              type="checkbox"
              id="vegetarian"
              name="vegetarian"
              checked={vegetarian}
              onChange={() => setVegetarian((prev) => !prev)}
            />
          </div>
          {/* button for sorting */}
          <Sort onChange={(option: Option) => setSelectedSort(option.value)} />
        </div>

        <div className="recipe-link">
          {displayedRecipes.map((recipe: Recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
        {displayedRecipes.length < filteredRecipes.length && (
          <button id="loadMore" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default MainPage;
