import RecipeListItem from '../../components/RecipeItem';
import Sort from '../../components/Sort';
import { Option } from 'react-dropdown';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import './index.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import RECIPES from './queries';
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
  const [selectedSort, setSelectedSort] = useState<string>(''); // Sort state for dropdown
  const [vegetarian, setVegetarian] = useState(false);
  const [desert, setDesert] = useState(false);
  const [chicken, setChicken] = useState(false);
  const [beef, setBeef] = useState(false);
  const [tags, setTags] = useState<string[]>([]); // Tags state for checkboxes
  const [totalRecipes, setTotalRecipes] = useState(0);

  useEffect(() => {
    const newTags = [];
    if (vegetarian) newTags.push('vegetarian');
    if (desert) newTags.push('desert');
    if (chicken) newTags.push('chicken');
    if (beef) newTags.push('beef');
    setTags(newTags);
  }, [vegetarian, desert, chicken, beef]);

  //sort Change
  const handleSortChange = (option: Option) => {
    setSelectedSort(option.value);
  }

  const { loading, error, data } = useQuery(RECIPES, {
    variables: { 
      offset: (currentPage - 1) * itemsPerPage, 
      limit: itemsPerPage,
      sort: selectedSort, // Pass sort state to query
      tags, // Pass tags array to query
      searchTerm
    },
  });

  useEffect(() => {
    if (data && data.getRecipes && 'totalCount' in data.getRecipes) {
      setTotalRecipes(data.getRecipes.totalCount);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  // Get all the recipes from the database
  const recipes: Recipe[] = data?.getRecipes?.recipes ?? [];

  const noRecipesFound = recipes.length === 0 && !loading;

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

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
              checked={vegetarian}
              onChange={() => setVegetarian(!vegetarian)}
            />
            <label htmlFor="desert">Desert</label>
            <input
              type="checkbox"
              id="desert"
              checked={desert}
              onChange={() => setDesert(!desert)}
            />
            <label htmlFor="chicken">Chicken</label>
            <input
              type="checkbox"
              id="chicken"
              checked={chicken}
              onChange={() => setChicken(!chicken)}
            />
            <label htmlFor="beef">Beef</label>
            <input
              type="checkbox"
              id="beef"
              checked={beef}
              onChange={() => setBeef(!beef)}
            />
          </div>
          {/* button for sorting */}
          <Sort onChange={handleSortChange} value={selectedSort} />
        </div>

        <div className="recipe-link">
          {noRecipesFound ? (
            <p>No recipes found</p>
          ) : (
            recipes.map((recipe: Recipe) => (
              <RecipeListItem key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
        <Pagination 
          total={totalRecipes} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          setPage={handlePageChange}
        />
      </div>
    </div>
  );
}

export default MainPage;
