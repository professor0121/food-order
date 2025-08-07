import Meal from '../models/meal.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createMeal = asyncHandler(async (req, res) => {
  console.log("Received meal data:", req.body);
  const { title, category, items, price, specialToday ,image} = req.body;

  const meal = new Meal({
    title,
    category,
    items: JSON.parse(items),
    price,
    specialToday: specialToday === 'true',
    image: image, // Ensure image is set, even if empty
  });

  await meal.save();
  res.status(201).json(meal);
})
