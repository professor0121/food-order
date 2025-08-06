import React from 'react'



const HeroAllPages = ({title,description,image}) => {
  return (
    <div className="hero-container flex justify-center items-center" style={{ backgroundImage: `url(${image})` }}>
      <div className='hero-content text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-lg'>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-700 mb-6">{description}</p>
      </div>
    </div>
  )
}

export default HeroAllPages