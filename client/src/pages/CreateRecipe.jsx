import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../services/recipeService";

const CreateRecipe = () => {
  const navigate = useNavigate();

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

    data.append("image", formData.image);

    try {
      for (const pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }
      await createRecipe(data);

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      alert(error.response?.data?.message || "Failed to create recipe");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Create Recipe</h1>

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
            name="description"
            placeholder="Recipe Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 text-gray-900"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:bg-orange-500 file:text-white
    file:cursor-pointer
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
              placeholder="Cooking Time (mins)"
              value={formData.cookingTime}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>

            {ingredients.map((item, index) => (
              <input
                key={index}
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="w-full border rounded-lg px-4 py-3 mb-3 text-gray-900"
              />
            ))}

            <button
              type="button"
              onClick={addIngredient}
              className="text-orange-600 font-semibold"
            >
              + Add Ingredient
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Instructions</h2>

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
              className="text-orange-600 font-semibold"
            >
              + Add Step
            </button>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
            Publish Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
