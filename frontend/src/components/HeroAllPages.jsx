import React from 'react';

const HeroAllPages = ({ title, description, image }) => {
  return (
    <div
      className="hero-container flex justify-center items-center bg-cover bg-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] my-8"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="hero-content text-center p-6 sm:p-8 bg-white/80 rounded-lg shadow-lg max-w-2xl">
        {title && <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#000]">{title}</h1>}
        {description && <p className="text-base sm:text-lg text-gray-700 mb-6">{description}</p>}
      </div>
    </div>
  );
};

export default HeroAllPages;
