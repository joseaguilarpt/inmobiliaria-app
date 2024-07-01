// src/components/Image/Image.tsx

import React from 'react';
import './Image.scss';

interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <div className='image__container'>
      <img className='image__img' src={src} alt={alt} />
    </div>
  );
};

export default Image;
