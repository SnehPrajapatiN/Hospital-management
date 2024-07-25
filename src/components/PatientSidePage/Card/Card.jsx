import React from 'react';
import './Card1.css';
import img from './image.png';

function Card({ id, name, specialist, description, onBookNow }) {
  const handleBookNowClick = () => {
    onBookNow(id);
    console.log(id);
  };

  return (
    <div className='card3'>
      <div className='img'>
        <img src={img} alt="no_person" />
      </div>
      <div className='name'>{name}</div>
      <div className='specialist'>{specialist}</div>
      <p className='description'>
        {description}
      </p>
      <div className='btn'>
        <button onClick={handleBookNowClick}>Book Now</button>
      </div>
    </div>
  );
}

export default Card;
