import React from 'react';
import './StarRating.css'

const StarRating = ({ rating }) => {
  // Calculate the width percentage for the stars based on the rating
  const starPercentage = (rating / 10) * 100;

  return (
    <div>
<div className="star-rating">
      <div className="star-rating-top" style={{ width: `${starPercentage}%` }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className="star-rating-bottom">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
    </div>
    
  );
};

export default StarRating;
