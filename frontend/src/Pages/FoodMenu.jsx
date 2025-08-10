import HeroAllPages from '@/components/HeroAllPages'
import React, { useEffect } from 'react'
import { HeroBanner } from '@/images/images'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMeals } from '@/redux/slices/mealSlice'

const FoodMenu = () => {
  const { meals, isLoading, error } = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);
  console.log(meals, isLoading, error);
  return (
    <div>
      <HeroAllPages title="Food Menu" description="Explore our delicious food options" image={HeroBanner} />

    </div>
  )
}

export default FoodMenu