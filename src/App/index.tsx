import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RecipeDetails from '../pages/RecipeDetails';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route
          path="/recipe/:name"
          element={<RecipeDetails />}
        />
        <Route path="/" element={<MainPage itemsPerPage={4} />} />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
