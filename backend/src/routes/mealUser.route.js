import { Router } from "express";
import { getAllMeals ,getSingleMeal} from "../controllers/meal.controller.js";
const router=Router();

router.get('/',getAllMeals)
router.get('/single/:id',getSingleMeal)

export default router;