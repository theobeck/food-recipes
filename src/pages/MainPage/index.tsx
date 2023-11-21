import { useState, useEffect } from 'react';
import RecipeList from '../../components/RecipeList';
import Sort from '../../components/Sort';
import { Option } from 'react-dropdown';
import SearchBar from '../../components/SearchBar';
import logo from '../../assets/recipesLogo.png';
import cooking from '../../assets/cooking.jpg';
import './index.css';


// Defines the properties interface for the main page
interface MainPageProps {
  itemsPerPage: number;
}

// Defines the main page functional component that displays the recipes
function MainPage({ itemsPerPage }: MainPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [vegetarian, setVegetarian] = useState<boolean>(false);
  const [desert, setDesert] = useState<boolean>(false);
  const [chicken, setChicken] = useState<boolean>(false);
  const [beef, setBeef] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

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
            <SearchBar setSearchTerm= {setSearchTerm} />
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

        <RecipeList
          selectedSort={selectedSort}
          tags={tags}
          searchTerm={searchTerm}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
}

export default MainPage;
