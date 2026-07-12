import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRecipeById, updateRecipe } from "../services/recipeService";

const EditRecipe = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "breakfast",
    cuisine: "",
    difficulty: "easy",
    cookingTime: "",
    image: null,
  });

  const [ingredients, setIngredients] = useState([""]);

  const [instructions, setInstructions] = useState([""]);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const recipe = await getRecipeById(id);

      setFormData({
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty,
        cookingTime: recipe.cookingTime,
        image: null,
      });

      setIngredients(recipe.ingredients);

      setInstructions(recipe.instructions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];

    updated[index] = value;

    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];

    updated[index] = value;

    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);

    data.append("description", formData.description);

    data.append("category", formData.category);

    data.append("cuisine", formData.cuisine);

    data.append("difficulty", formData.difficulty);

    data.append("cookingTime", formData.cookingTime);

    ingredients.forEach((item) => data.append("ingredients", item));

    instructions.forEach((item) => data.append("instructions", item));

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await updateRecipe(id, data);

      navigate(`/recipes/${id}`);
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Failed to update recipe");
    }
  };

  if (loading) {
    return <h1 className="text-center mt-20 text-2xl">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-gray-900"
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Recipe Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-gray-900"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Replace Recipe Image (Optional)
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-md
              file:border-0
              file:bg-orange-500
              file:text-white
              hover:file:bg-orange-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-gray-900"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>

            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-gray-900"
            />

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-gray-900"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <input
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="Cooking Time"
              className="border rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Ingredients
            </h2>

            {ingredients.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="w-full border rounded-lg px-4 py-3 mb-3 text-gray-900"
              />
            ))}

            <button
              type="button"
              onClick={addIngredient}
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              + Add Ingredient
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Instructions
            </h2>

            {instructions.map((item, index) => (
              <textarea
                key={index}
                rows="3"
                value={item}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                className="w-full border rounded-lg px-4 py-3 mb-3 text-gray-900"
              />
            ))}

            <button
              type="button"
              onClick={addInstruction}
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              + Add Step
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Update Recipe
            </button>

            <button
              type="button"
              onClick={() => navigate(`/recipes/${id}`)}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
