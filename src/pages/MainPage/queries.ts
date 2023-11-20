import { gql } from '@apollo/client';

const RECIPES = gql`
      query getRecipes(
    $limit: Int,
    $offset: Int,
    $sort: String,
    $tags: [String],
    $searchTerm: String
  ) {
    getRecipes(
      limit: $limit,
      offset: $offset,
      sort: $sort,
      tags: $tags
      searchTerm: $searchTerm
    ) {
      id
      name
      imageUrl
      reviews {
        rating
        comment 
      }
    }
  }
`;
export default RECIPES;