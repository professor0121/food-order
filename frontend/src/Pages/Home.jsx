import FoodCard from '@/components/FoodCard'
import { Hero12 } from '@/components/hero12'
import React from 'react'

const foodItems = [
  {
    image: "https://source.unsplash.com/400x300/?pizza",
    name: "Margherita Pizza",
    description: "Classic Italian pizza topped with 100% real mozzarella cheese.",
    price: 199,
    isVeg: true,
    rating: 4,
    category: "Italian",
    deliveryTime: "30-40 min"
  },
  {
    image: "https://source.unsplash.com/400x300/?burger",
    name: "Chicken Zinger Burger",
    description: "Spicy, crispy chicken fillet with mayo & lettuce in a soft bun.",
    price: 249,
    isVeg: false,
    rating: 5,
    category: "Fast Food",
    deliveryTime: "20-30 min"
  },
  {
    image: "https://source.unsplash.com/400x300/?noodles",
    name: "Veg Hakka Noodles",
    description: "Stir-fried noodles tossed with fresh vegetables and soy sauce.",
    price: 149,
    isVeg: true,
    rating: 4,
    category: "Chinese",
    deliveryTime: "25-35 min"
  },
  {
    image: "https://source.unsplash.com/400x300/?biryani",
    name: "Hyderabadi Chicken Biryani",
    description: "Fragrant basmati rice cooked with chicken, spices, and herbs.",
    price: 299,
    isVeg: false,
    rating: 5,
    category: "Indian",
    deliveryTime: "35-45 min"
  },
  {
    image: "https://source.unsplash.com/400x300/?salad",
    name: "Greek Salad",
    description: "Fresh vegetables, feta cheese, and olives tossed in vinaigrette.",
    price: 129,
    isVeg: true,
    rating: 3,
    category: "Healthy",
    deliveryTime: "15-25 min"
  }
]


const Home = () => {
  return (
    <div>
      <Hero12 />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Food Order</h1>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
         {foodItems.map((item, index) => (
          <FoodCard key={index} {...item} />
        ))}
       </div>

      </div>
    </div>
  )
}

export default Home