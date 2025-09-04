import React from 'react';

const NewSeason = () => {
  return (
    <div className="newSeason">
      <div className="nsItem">
        <img 
          src="https://images.pexels.com/photos/4753986/pexels-photo-4753986.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
          alt="Woman posing in winter wear" 
          className="nsImg" 
        />
      </div>
      <div className="nsItem">
        <h3 className="nsTitleSm">WINTER NEW ARRIVALS</h3>
        <h1 className="nsTitle">New Season</h1>
        <h1 className="nsTitle">New Collection</h1>
        <a href="#nav">
          <button className="nsButton">CHOOSE YOUR STYLE</button>
        </a>
      </div>
      <div className="nsItem">
        <img 
          src="https://images.pexels.com/photos/7856965/pexels-photo-7856965.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
          alt="Nike shoe on a colorful background" 
          className="nsImg" 
        />
      </div>
    </div>
  );
};

export default NewSeason;