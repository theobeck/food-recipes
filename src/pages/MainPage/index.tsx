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
  const [vegetarian, setVegetarian] = useState<boolean>(JSON.parse(sessionStorage.getItem('vegetarian') ?? 'false'));
  const [desert, setDesert] = useState<boolean>(JSON.parse(sessionStorage.getItem('desert') ?? 'false'));
  const [chicken, setChicken] = useState<boolean>(JSON.parse(sessionStorage.getItem('chicken') ?? 'false'));
  const [beef, setBeef] = useState<boolean>(JSON.parse(sessionStorage.getItem('beef') ?? 'false'));
  const [asian, setAsian] = useState<boolean>(JSON.parse(sessionStorage.getItem('asian') ?? 'false'));
  const [japanese, setJapanese] = useState<boolean>(JSON.parse(sessionStorage.getItem('japanese') ?? 'false'));
  const [soup, setSoup] = useState<boolean>(JSON.parse(sessionStorage.getItem('soup') ?? 'false'));

  const { searchTerm, setSearchTerm, selectedSort, setSelectedSort, setTags, tags } = useGlobalContext();

  useEffect(() => {
    sessionStorage.setItem('vegetarian', JSON.stringify(vegetarian));
    sessionStorage.setItem('desert', JSON.stringify(desert));
    sessionStorage.setItem('chicken', JSON.stringify(chicken));
    sessionStorage.setItem('beef', JSON.stringify(beef));
    sessionStorage.setItem('asian', JSON.stringify(asian));
    sessionStorage.setItem('japanese', JSON.stringify(japanese));
    sessionStorage.setItem('soup', JSON.stringify(soup));
  } , [vegetarian, desert, chicken, beef, asian, japanese, soup]);

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
        <a href={import.meta.env.BASE_URL} tabIndex={0}>
          <img id="logo" src={logo} alt="Recipes Logo" />
        </a>
        <a
          id="aboutUs"
          target="_blank"
          href="https://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUIcmlja3JvbGw%3D"
          tabIndex={0}
        >
          About us
        </a>
      </section>

      <section className="header">
        <div id="headerDiv">
          <p>Get inspired with recipes from all around the world, made easy and accessable!</p>
        </div>

        <img id="headerImg" src={cooking} alt="inspiring image of cooking" />
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
            <label htmlFor="vegetarian" className={vegetarian ? 'labelChecked' : 'labelUnchecked'} tabIndex={0}>
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
            <label htmlFor="desert" className={desert ? 'labelChecked' : 'labelUnchecked'} tabIndex={0}>
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
            <label htmlFor="chicken" className={chicken ? 'labelChecked' : 'labelUnchecked'} tabIndex={0}>
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
            <label htmlFor="beef" className={beef ? 'labelChecked' : 'labelUnchecked'} tabIndex={0}>
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
            <label htmlFor="asian" className={asian ? 'labelChecked' : 'labelUnchecked'} tabIndex={0}>
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
            <label htmlFor="japanese" className={japanese ? 'labelChecked' : 'labelUnchecked'} tabIndex={0}>
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
            <label htmlFor="soup" className={soup ? 'labelChecked' : 'labelUnchecked'} tabIndex={0}>
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
