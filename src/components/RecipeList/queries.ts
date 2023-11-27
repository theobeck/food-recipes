import { gql } from '@apollo/client';

const RECIPES = gql`
  query getRecipes($limit: Int, $offset: Int, $sort: String, $tags: [String], $searchTerm: String) {
    getRecipes(limit: $limit, offset: $offset, sort: $sort, tags: $tags, searchTerm: $searchTerm) {
      recipes {
        id
        name
        imageUrl
        tags
        reviews {
          rating
          comment
        }
      }
      totalCount
    }
  }
`;
export default RECIPES;
