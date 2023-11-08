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
        setRating(newRating);
    }

    const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(event.target.value);
    }

    const handleSubmit = async () => {
        console.log("Trying to Upload -> Rating: " + rating + " Comment: " + comment + " to ID: " + name);
        // Here, you can perform any actions with the rating and comment values
        try {
            const result = await addReview({
                variables: {
                    id: id,
                    rating: rating,
                    comment: comment
                }
            });
            console.log('Review uploaded successfully!', result.data.addReview);
            //refresh page
            window.location.reload();
        } catch (error) {
            console.error('Error uploading', error);
        }
    }

    return (
        <div className="rating">
            <ReactStars
                count={5}
                size={34}
                half={false}
                color2={'#ffd700'}
                onChange={ratingChanged}
                value={rating}
            />

            <div className='input'>
                <input
                    id="comment"
                    type="text"
                    placeholder="Add a review"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}