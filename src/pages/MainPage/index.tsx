import { useState, useEffect } from 'react';
import RecipeList from '../../components/RecipeList';
import Sort from '../../components/Sort';
import { Option } from 'react-dropdown';
import SearchBar from '../../components/SearchBar';
import logo from '../../assets/recipesLogo.png';
import cooking from '../../assets/cooking.jpg';
import './index.css';
import { useGlobalContext } from '../../utils/GlobalContext';

// Defines the properties interface for the main page
interface MainPageProps {
  itemsPerPage: number;
}

// Defines the main page functional component that displays the recipes
function MainPage({ itemsPerPage }: MainPageProps) {
  const [vegetarian, setVegetarian] = useState<boolean>(false);
  const [desert, setDesert] = useState<boolean>(false);
  const [chicken, setChicken] = useState<boolean>(false);
  const [beef, setBeef] = useState<boolean>(false);
  const [asian, setAsian] = useState<boolean>(false);
  const [japanese, setJapanese] = useState<boolean>(false);
  const [soup, setSoup] = useState<boolean>(false);

  const { searchTerm, setSearchTerm, selectedSort, setSelectedSort, setTags, tags } = useGlobalContext();

  useEffect(() => {
    const newTags = [];
    if (vegetarian) newTags.push('vegetarian');
    if (desert) newTags.push('desert');
    if (chicken) newTags.push('chicken');
    if (beef) newTags.push('beef');
    if (asian) newTags.push('asian');
    if (japanese) newTags.push('japanese');
    if (soup) newTags.push('soup');
    setTags(newTags);
  }, [vegetarian, desert, chicken, beef, asian, japanese, soup, setTags]);

  const handleSortChange = (option: Option) => {
    setSelectedSort(option.value);
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
          <p>Get inspired with recipes from all around the world, made easy and accessable!</p>
        </div>

        <img id="headerImg" src={cooking} alt="cooking image" />
      </section>

      <div id="containerHeader">
        <div className="search">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
        <Sort onChange={handleSortChange} value={selectedSort} />
      </div>

      <div className="container">
        <div id="containerBody">
          <div className="filter" data-testid="filter">
            {/* Vegetarian Checkbox and Label */}
            <input
              type="checkbox"
              id="vegetarian"
              className="hiddenCheckbox"
              checked={vegetarian}
              onChange={() => setVegetarian(!vegetarian)}
            />
            <label htmlFor="vegetarian" className={vegetarian ? 'labelChecked' : 'labelUnchecked'}>
              Vegetarian
            </label>

            {/* Dessert Checkbox and Label */}
            <input
              type="checkbox"
              id="desert"
              className="hiddenCheckbox"
              checked={desert}
              onChange={() => setDesert(!desert)}
            />
            <label htmlFor="desert" className={desert ? 'labelChecked' : 'labelUnchecked'}>
              Dessert
            </label>

            {/* Chicken Checkbox and Label */}
            <input
              type="checkbox"
              id="chicken"
              className="hiddenCheckbox"
              checked={chicken}
              onChange={() => setChicken(!chicken)}
            />
            <label htmlFor="chicken" className={chicken ? 'labelChecked' : 'labelUnchecked'}>
              Chicken
            </label>

            {/* Beef Checkbox and Label */}
            <input
              type="checkbox"
              id="beef"
              className="hiddenCheckbox"
              checked={beef}
              onChange={() => setBeef(!beef)}
            />
            <label htmlFor="beef" className={beef ? 'labelChecked' : 'labelUnchecked'}>
              Beef
            </label>

            {/* Asian Checkbox and Label */}
            <input
              type="checkbox"
              id="asian"
              className="hiddenCheckbox"
              checked={asian}
              onChange={() => setAsian(!asian)}
            />
            <label htmlFor="asian" className={asian ? 'labelChecked' : 'labelUnchecked'}>
              Asian
            </label>

            {/* Japanese Checkbox and Label */}
            <input
              type="checkbox"
              id="japanese"
              className="hiddenCheckbox"
              checked={japanese}
              onChange={() => setJapanese(!japanese)}
            />
            <label htmlFor="japanese" className={japanese ? 'labelChecked' : 'labelUnchecked'}>
              Japanese
            </label>

            {/* Soup Checkbox and Label */}
            <input
              type="checkbox"
              id="soup"
              className="hiddenCheckbox"
              checked={soup}
              onChange={() => setSoup(!soup)}
            />
            <label htmlFor="soup" className={soup ? 'labelChecked' : 'labelUnchecked'}>
              Soup
            </label>
          </div>
        </div>

        <RecipeList selectedSort={selectedSort} tags={tags} searchTerm={searchTerm} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}

export default MainPage;
