import HeroAllPages from '@/components/HeroAllPages'
import React from 'react'
import { HeroBanner } from '@/images/images'

const FoodMenu = () => {
  return (
    <div>
            <HeroAllPages title="Food Menu" description="Explore our delicious food options" image={HeroBanner} />
    </div>
  )
}

export default FoodMenu