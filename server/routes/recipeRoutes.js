import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/recipes", protect, upload.single("image"), createRecipe);

router.get("/recipes", getRecipes);

router.get("/recipes/:id", getRecipeById);

router.put(
  "/recipes/:id",
  protect,
  upload.single("image"),
  updateRecipe
);

router.delete("/recipes/:id", protect, deleteRecipe);

export default router;
