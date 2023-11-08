import React, { useState } from 'react';
import ReactStars from 'react-stars';
import './index.css'; // Import the CSS file

export default function Rating() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const ratingChanged = (newRating: React.SetStateAction<number>) => {
        setRating(newRating);
    }

    const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setComment(event.target.value);
    }

    const handleSubmit = () => {
        console.log("Rating: " + rating);
        console.log("Comment: " + comment);
    }

    return (
        <div className="rating">
            <ReactStars
                count={5}
                size={34}
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