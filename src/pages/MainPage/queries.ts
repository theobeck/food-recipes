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
    export default GET_ALL_RECIPES;