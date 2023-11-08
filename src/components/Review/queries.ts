import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
    mutation AddReview($addReviewId: Int!, $rating: Int!, $comment: String!) {
        addReview(id: $addReviewId, rating: $rating, comment: $comment) {
            id
            reviews{
                rating
                comment
            }
        }
    }
`;

