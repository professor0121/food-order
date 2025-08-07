import Meal from '../models/meal.model.js';

export const createMealService= async (mealData) => {
  const meal = new Meal(mealData);
  return await meal.save();
}

export const getAllMealsService = async () => {
  return await Meal.find();
}