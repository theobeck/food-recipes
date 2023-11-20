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
    vegetarian: Boolean
    tags: [String]
  }

  type Query {
    getRecipes(limit: Int, offset: Int, sort: String, tags: [String], searchTerm: String): [Recipe]
    getRecipeById(id: Int!): Recipe
    getRecipeByName(name: String!): Recipe
  }

  type Mutation {
    addRecipe(input: RecipeInput!): Recipe
    updateRecipe(id: ID!, input: RecipeInput!): Recipe
    deleteRecipe(id: ID!): Recipe
    addReview(id: Int!, rating: Int!, comment: String!): Recipe
  }

  input RecipeInput {
    name: String
    imageUrl: String
    description: String
    ingredients: [String]
    instructions: [String]
    reviews: [ReviewInput]
    tags: [String]
  }
  input ReviewInput {
    rating: Int!
    comment: String!
  }
`;
