import { gql } from 'graphql-tag';

export const typeDefs = gql`
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
    getRecipeByName(name: String!): Recipe
  }

  type Mutation {
    addRecipe(input: RecipeInput!): Recipe
    updateRecipe(id: ID!, input: RecipeInput!): Recipe
    deleteRecipe(id: ID!): Recipe
  }

  input RecipeInput {
    name: String
    imageUrl: String
    description: String
    ingredients: [String]
    instructions: [String]
    reviews: [ReviewInput]
  }
  input ReviewInput {
    rating: Int
    comment: String
  }
`;
