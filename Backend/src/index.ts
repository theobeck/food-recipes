import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';

// Read the JSON file containing recipe data
const data = fs.readFileSync('../mockup-data.json', 'utf8');
const { recipes } = JSON.parse(data);

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
  

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Recipe: {
        reviews: (recipe) => {
            return recipe.reviews.map((review) => {
                return review; // return the entire review object
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