import React from 'react';

const Gallery = () => {
  return (
    <div className="gallery">
      <div className="galleryItem">
        <h1 className="galleryTitle">Be Yourself!</h1>
        <img 
          src="https://images.pexels.com/photos/9295809/pexels-photo-9295809.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
          alt="Person tying their shoe" 
          className="galleryImg" 
        />
      </div>
      <div className="galleryItem">
        <img 
          src="https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
          alt="Person walking in sneakers" 
          className="galleryImg" 
        />
        <h1 className="galleryTitle">This is the First Day of Your New Life</h1>
      </div>
      <div className="galleryItem">
        <h1 className="galleryTitle">Just Do It!</h1>
        <img 
          src="https://images.pexels.com/photos/7856965/pexels-photo-7856965.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
          alt="Nike shoe on a colorful background" 
          className="galleryImg" 
        />
      </div>
    </div>
  );
};

export default Gallery;