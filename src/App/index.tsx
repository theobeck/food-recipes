import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RecipeDetails from '../pages/RecipeDetails';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  const [recipes ] = useState([]);
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route
          path="/recipe/:id"
          element={<RecipeDetails recipes={recipes} />}
        />
        <Route path="/" element={<MainPage recipes={recipes} itemsPerPage={4} />} />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
