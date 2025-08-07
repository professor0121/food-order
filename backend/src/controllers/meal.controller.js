import Meal from '../models/meal.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import {createMealService} from '../services/meal.service.js';

export const createMeal = asyncHandler(async (req, res) => {
  console.log("Received meal data:", req.body);
  const { title, category, items, price, specialToday ,image} = req.body;

  const meal = await createMealService({
    title,
    category,
    items,
    price,
    specialToday: specialToday === 'true',
    image
  });
  res.status(201).json(meal);
})


export const getAllMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find();
  res.status(200).json(meals);
})