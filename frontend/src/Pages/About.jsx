import React from 'react'
import PageHero from '@/components/PageHero.jsx'

const About = () => {
  return (
    <div>
      <PageHero title="About Us" subtitle="Learn more about our mission and values" />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700">
          We are a team of food enthusiasts on a mission to deliver the best culinary experiences to your doorstep.
        </p>
      </div>
    </div>
  )
}

export default About