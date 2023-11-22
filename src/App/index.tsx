import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RecipeDetails from '../pages/RecipeDetails';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://it2810-13.idi.ntnu.no:4000/',
  // uri: 'localhost:5173/project2/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path={import.meta.env.BASE_URL + '/recipe/:name'} element={<RecipeDetails />} />
          <Route path={import.meta.env.BASE_URL} element={<MainPage itemsPerPage={4} />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
