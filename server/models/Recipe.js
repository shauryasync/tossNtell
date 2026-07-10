import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    instructions: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    category: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack", "dessert"],
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    cookingTime: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
