import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
    mutation AddReview($id: Int!, $rating: Int!, $comment: String!) {
        addReview(id: $id, rating: $rating, comment: $comment) {
            id
            rating
            comment
        }
    }
`;
