import React, { useState, useEffect, useRef } from "react";
import "./ImageSlider.scss";
import Image from "../Image/Image";

interface ImageSliderProps {
  images: string[];
  autoSlideInterval?: number;
  initialValue?: number;
  defaultBackgroundColor?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoSlideInterval = 310000,
  initialValue = 0,
  defaultBackgroundColor = "#f0f0f0", // Default background color if not provided
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  let slideInterval: NodeJS.Timeout;

  // Update currentIndex when initialValue changes
  useEffect(() => {
    setCurrentIndex(initialValue);
  }, [initialValue]);

  // Function to go to the next slide
  const nextSlide = (e: React.ChangeEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = (e: React.ChangeEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Prevent default drag behavior
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.stopPropagation();
  };

  // Handle slide change on drag end
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const deltaX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    if (deltaX > 50) {
      prevSlide(e);
    } else if (deltaX < -50) {
      nextSlide(e);
    }
  };

  // Set up event listeners for drag events
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("dragstart", handleDragStart);
      slider.addEventListener("dragend", handleDragEnd);

      return () => {
        slider.removeEventListener("dragstart", handleDragStart);
        slider.removeEventListener("dragend", handleDragEnd);
      };
    }
  }, []);

  // Automatic slide change interval
  useEffect(() => {
    slideInterval = setInterval(nextSlide, autoSlideInterval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex, autoSlideInterval]);

  // Clear interval on component unmount and update
  useEffect(() => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, autoSlideInterval);

    return () => {
      clearInterval(slideInterval);
    };
  }, [autoSlideInterval]);

  return (
    <div className="image-slider" ref={sliderRef}>
      <div
        className="slides"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slides__image-item" key={index}>
            {currentIndex === index && (
              <Image
                src={image}
                alt={`Property image ${index}`}
              />
            )}
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
