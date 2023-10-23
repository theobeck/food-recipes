import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Review {
  rating: Int
  comment: String
}

  type Recipe {
    id: ID!
    name: String!
    description: String
    imageUrl: String
    ingredients: [String]
    instructions: [String]
    reviews: [Review]
  }

  type Query {
    getAllRecipes: [Recipe]
    getRecipeById(id: ID!): Recipe
  }
  
`;

const recipes = [
    {
      id: '1',
      name: 'Spaghetti Bolognese',
      description: 'Classic Italian pasta dish',
      imageUrl: 'spaghetti.jpg',
      ingredients: ['spaghetti', 'tomato sauce', 'ground beef', 'onion'],
      instructions: ['Cook the pasta', 'Prepare the sauce', 'Serve with grated cheese'],
      reviews: [[5, 'Great recipe!'], [4, 'Would recommend!']]
    },
    {
      id: '2',
      name: 'Chicken Stir-Fry',
      description: 'Quick and delicious stir-fry recipe',
      imageUrl: 'stir-fry.jpg',
      ingredients: ['chicken', 'vegetables', 'soy sauce', 'rice'],
      instructions: ['Cook the chicken', 'Stir-fry with vegetables', 'Serve with rice'],
      reviews: [[5, 'Delicious!']]
    },
  ];
  

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Recipe: {
        reviews: (recipe) => {
          // Assuming 'recipe' is an object with a 'reviews' field
          return recipe.reviews.map(([rating, comment]) => {
            return { rating, comment };
          });
        },
      },
    Query: {
      getAllRecipes: () => recipes,
      getRecipeById: (parent, { id }) => {
        const recipe = recipes.find((recipe) => recipe.id === id);
        if (!recipe) {
          throw new Error(`Recipe with ID ${id} not found`);
        }
        return recipe;
      },
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);