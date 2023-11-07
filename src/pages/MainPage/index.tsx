import RecipeListItem from "../../components/RecipeItem";
import Filter from "../../components/Filter";
import './index.css';
import { useState } from 'react';
import { Option } from "react-dropdown";
import { useQuery } from '@apollo/client';
import GET_ALL_RECIPES from './queries';

// Define an interface "Recipe" that is representing a recipe
interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
}

// Define the properties interface for the main page
interface MainPageProps {
  itemsPerPage: number;
}

// Define the main page functional component that displays the recipes
function MainPage({ itemsPerPage }: MainPageProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // function to load more recipes
  const loadMore = () => setCurrentPage(currentPage + 1);

  const { loading, error, data } = useQuery(GET_ALL_RECIPES, {
    // Use for filters and pagination
    variables: { offset: 0, limit: currentPage * itemsPerPage },

  });

  //TODO: FETCH MORE

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data?.getAllRecipes || [];



  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRecipes = recipes.slice(0, endIndex);

  // Show the main page
  return (
    <div className="main-page">
      <div className="nav">
        <img id="logo" src="src\assets\recipesLogo.png" alt="Recipes Logo" />
      </div>

      <section className="header">
        
        <div id="headerDiv">
          <p>
            What do you feel like making:
          </p>

          <div className="search">
            <input type="text"/>
            <button><img src="src\assets\searchIcon.png"/></button>
            
          </div>
          

        </div>

        {/*Adding a proper search bar in next iteration*/}
        
        <img id="headerImg" src="src\assets\cooking.jpg" alt="cooking image"/>

      </section>
      <div className="container">

        <div id="containerHeader">

          <p>Latest and greatest</p>

          {/* filtering button */}
          <Filter onChange={(option: Option) => console.log(option)} />

        </div>

        <div className="recipe-link">
          {displayedRecipes.map((recipe: Recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
        {displayedRecipes.length < recipes.length && (
          <button id = "loadMore" onClick={loadMore}>Load More</button>
        )}
      </div>

    </div>
  );
}

export default MainPage;