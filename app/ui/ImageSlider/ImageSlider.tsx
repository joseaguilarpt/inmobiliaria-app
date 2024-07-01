import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.scss';

const ImageSlider = ({ images, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  let slideInterval;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnd = (e) => {
    const deltaX = e.clientX - e.target.getBoundingClientRect().left;
    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    slider.addEventListener('dragstart', handleDragStart);
    slider.addEventListener('dragend', handleDragEnd);

    return () => {
      slider.removeEventListener('dragstart', handleDragStart);
      slider.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  useEffect(() => {
    slideInterval = setInterval(nextSlide, autoSlideInterval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex]);

  return (
    <div className="image-slider" ref={sliderRef}>
      <div className="slides" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="slide" key={index} style={{ backgroundImage: `url(${image})` }}>
            {/* You can add additional content or controls within each slide if needed */}
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>&#10094;</button>
      <button className="next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default ImageSlider;
