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
  const [asian, setAsian] = useState<boolean>(false);
  const [japanese, setJapanese] = useState<boolean>(false);
  const [soup, setSoup] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

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
  }, [vegetarian, desert, chicken, beef, asian, japanese, soup]);



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
        <a href='../Categories/index.tsx' className={vegetarian ? 'labelChecked' : 'labelUnchecked'}  onClick={() => setVegetarian(!vegetarian)}>Vegetarian</a>
        <a id="aboutUs" target="_blank" href="https://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUIcmlja3JvbGw%3D">
          About us
        </a>
      </section>

      <section className="header">
        <div id="headerDiv">
          <p>Get inspired with recipes from all around the world, made easy and accessable</p>

        </div>

        <img id="headerImg" src={cooking} alt="cooking image" />
      </section>

      <div id='containerHeader'>

        <div className="search">
          <SearchBar setSearchTerm= {setSearchTerm} />
        </div>
        <Sort onChange={handleSortChange} value={selectedSort} />

      </div>


      <div className="container">

        <div id="containerBody">


          <div className="filter">
            <label htmlFor="vegetarian" className={vegetarian ? 'labelChecked' : 'labelUnchecked'}  onClick={() => setVegetarian(!vegetarian)}>Vegetarian</label>
            
            <label className={desert ? 'labelChecked' : 'labelUnchecked'} htmlFor="desert" onClick={() => setDesert(!desert)}>Desert</label>
         
            <label className={chicken ? 'labelChecked' : 'labelUnchecked'}  htmlFor="chicken" onClick={() => setChicken(!chicken)}
            >Chicken</label>
           
            <label className={beef ? 'labelChecked' : 'labelUnchecked'} htmlFor="beef" onClick={() => setBeef(!beef)}>Beef</label>

            <label className={asian ? 'labelChecked' : 'labelUnchecked'} htmlFor="asian" onClick={() => setAsian(!asian)}>Asian</label>

            <label className={japanese ? 'labelChecked' : 'labelUnchecked'} htmlFor="japanese" onClick={() => setJapanese(!japanese)}>Japanese</label>

            <label className={soup ? 'labelChecked' : 'labelUnchecked'} htmlFor="soup" onClick={() => setSoup(!soup)}>Soup</label>
            
              
          </div>
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
