import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RecipeDetails from '../pages/RecipeDetails';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes data from the JSON file
    fetch('../Mockup-Data.json') // Replace with the correct path
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/recipe/:id"
          element={<RecipeDetails recipes={recipes} />}
        />
        <Route path="/" element={<MainPage recipes={recipes} itemsPerPage={3} />} />
      </Routes>
    </Router>
  );
}

export default App;
