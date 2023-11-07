import { gql } from '@apollo/client';

const GET_ALL_RECIPES = gql`
    query GetAllRecipes {
        getAllRecipes {
            id
            name
            imageUrl
        }
    }
    `;
    export default GET_ALL_RECIPES;