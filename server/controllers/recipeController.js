import Recipe from "../models/Recipe.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const createRecipe = async (req, res) => {
  let image = "";

  if (req.file) {
    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    image = uploadedImage.secure_url;
  }

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
  const cookingTimeNumber = Number(cookingTime);
  if (
    !title ||
    !description ||
    !ingredients ||
    (Array.isArray(ingredients) && ingredients.length === 0) ||
    !instructions ||
    (Array.isArray(instructions) && instructions.length === 0) ||
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
    cookingTime: cookingTimeNumber,
    image,
    createdBy: req.user._id,
  });

  res.status(201).json(recipe);
};

const getRecipes = async (req, res) => {
  try {
    const { search, category, cuisine, difficulty, maxTime, sort } = req.query;
    const filter = {};

    // Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Category Filter
    if (category) {
      filter.category = category.toLowerCase();
    }

    // Cuisine Filter
    if (cuisine) {
      filter.cuisine = {
        $regex: cuisine,
        $options: "i",
      };
    }

    // Difficulty Filter
    if (difficulty) {
      filter.difficulty = difficulty.toLowerCase();
    }

    // Cooking Time Filter
    if (maxTime) {
      filter.cookingTime = {
        $lte: Number(maxTime),
      };
    }
    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    if (sort === "time") {
      sortOption = { cookingTime: 1 };
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const recipes = await Recipe.find(filter)
      .populate("createdBy", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const totalRecipes = await Recipe.countDocuments(filter);

    res.status(200).json({
      totalRecipes,
      currentPage: page,
      totalPages: Math.ceil(totalRecipes / limit),
      recipes,
    });
  } catch (error) {
    console.error(error);

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
