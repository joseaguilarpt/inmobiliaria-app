// BackToTop.jsx

import React, { useState, useEffect } from 'react';
import './BackToTop.scss';
import Icon from '../Icon/Icon';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // Adjust this value to change when the button appears
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={handleScrollToTop}
    >
      <Icon icon='FaArrowUp' size='medium' />
    </button>
  );
};

export default BackToTop;
