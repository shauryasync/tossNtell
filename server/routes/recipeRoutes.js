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

<<<<<<< HEAD
router.put("/recipes/:id", protect, upload.single("image"), updateRecipe);
=======
router.put(
  "/recipes/:id",
  protect,
  upload.single("image"),
  updateRecipe
);
>>>>>>> 94da501af41f2036000272d8c20b32cee1704457

router.delete("/recipes/:id", protect, deleteRecipe);

export default router;
