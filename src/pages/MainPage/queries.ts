import { gql } from '@apollo/client';

const GET_ALL_RECIPES = gql`
    query GetAllRecipes {
        getAllRecipes {
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
const GET_VEGETARIAN_RECIPES = gql`
    query getAllVegetarianRecipes {
        getAllVegetarianRecipes {
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
export { GET_VEGETARIAN_RECIPES };
export default GET_ALL_RECIPES;