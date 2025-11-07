import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Stars = ({ rating, color = '#FFC107' }) => {
  const stars = [];
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        <FaStar
          key={i}
          style={{ color: color, marginRight: '3px' }}
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          style={{ color: color, opacity: 0.3, marginRight: '3px' }}
        />
      );
    }
  }

  return <div>{stars}</div>;
};

export default Stars;
