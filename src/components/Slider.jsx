import React, { useEffect } from 'react';
import { products } from '../data';

const Slider = ({ currentSlide }) => {
  useEffect(() => {
    const wrapper = document.querySelector('.sliderWrapper');
    if (wrapper) {
      wrapper.style.transform = `translateX(${-100 * currentSlide}vw)`;
    }
  }, [currentSlide]);

  return (
    <div className="slider">
      <div className="sliderWrapper">
        {products.map((product, index) => (
          <div key={product.id} className="sliderItem">
            <div className="sliderBg"></div>
            <div className="sliderPrice">Rs.{product.price}</div>
            <div className="sliderTitle">{product.title.toUpperCase()}</div>
            <img 
              src={product.colors[0]?.img} 
              alt={product.title}
              className="sliderImg" 
            />
            <button className="buyButton">
              BUY NOW!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
