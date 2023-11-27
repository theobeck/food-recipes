import { gql } from '@apollo/client';

const GET_RECIPE = gql`
  query GetRecipeByID($id: Int!) {
    getRecipeById(id: $id) {
      id
      name
      imageUrl
      description
      ingredients
      instructions
      tags
      reviews {
        rating
        comment
      }
    }
  }
`;

export default GET_RECIPE;
