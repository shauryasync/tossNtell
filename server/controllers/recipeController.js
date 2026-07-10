import Recipe from "../models/Recipe.js";

const createRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    category,
    cuisine,
    difficulty,
    cookingTime,
  } = req.body;

  if (
    !title ||
    !description ||
    ingredients.length === 0 ||
    instructions.length === 0 ||
    !category ||
    !cuisine ||
    !difficulty ||
    cookingTime == null
  ) {
    return res.status(400).json({
      message: "All required fields are required",
    });
  }

  const recipe = await Recipe.create({
    title,
    description,
    ingredients,
    instructions,
    category,
    cuisine,
    difficulty,
    cookingTime,

    createdBy: req.user._id,
  });

  res.status(201).json(recipe);
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "name email");

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id).populate(
      "createdBy",
      "name email",
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      ingredients,
      instructions,
      category,
      cuisine,
      difficulty,
      cookingTime,
    } = req.body;

    if (
      !title ||
      !description ||
      ingredients.length === 0 ||
      instructions.length === 0 ||
      !category ||
      !cuisine ||
      !difficulty ||
      cookingTime == null
    ) {
      return res.status(400).json({
        message: "All required fields are required",
      });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to modify this recipe",
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this recipe",
      });
    }

    await Recipe.findByIdAndDelete(id);

    res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };
