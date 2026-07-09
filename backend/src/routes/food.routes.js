import express from "express";
import {
  getPublicFoodCategories,
  getPublicFoodItems,
  addChefFoodItem,
  deleteChefFoodItem,
} from "../controllers/food.controller.js";

const router = express.Router();

router.get("/", getPublicFoodItems);
router.get("/categories", getPublicFoodCategories);
router.post("/chef", addChefFoodItem);
router.delete("/chef/:id", deleteChefFoodItem);

export default router;
