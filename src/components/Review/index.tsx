import React, { useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from './queries'; 

export default function Rating() {
    const [rating, setRating] = useState(0); // Initialize rating as a state
    const [comment, setComment] = useState(''); // Initialize comment as a state
    const { name } = useParams(); // Get the recipe ID from the URL
    const [ addReview ] = useMutation(ADD_REVIEW); 
    
    // Convert 'name' to an integer
    const id = parseInt(name || "", 10);

    
    const ratingChanged = (newRating: React.SetStateAction<number>) => {
        setRating(newRating); // Update the rating state when it changes
    }

    const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(event.target.value); // Update the comment state when the input changes
    }

    const handleSubmit = async () => {
        console.log("Trying to Upload -> Rating: " + rating + " Comment: " + comment + " to ID: " + name);
        // Here, you can perform any actions with the rating and comment values
        try {
            const result = await addReview({
                variables: {
                    addReviewId: id,
                    review: {
                        rating: rating,
                        comment: comment
                    }
                }
            });
            console.log('Review uploaded successfully!', result.data.addReview);
        } catch (error) {
            console.error('Error uploading', error);
        }
    }

    return (
        <div className="rating">
            <ReactStars
                count={5}
                size={24}
                color2={'#ffd700'}
                onChange={ratingChanged} // Pass the ratingChanged function as an onChange handler
                value={rating} // Pass the rating state as the value to display the selected rating
            />
            <input
                id="comment"
                type="text"
                placeholder="Add a review"
                value={comment} // Pass the comment state as the input value
                onChange={handleCommentChange} // Pass the handleCommentChange function as an onChange handler
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}