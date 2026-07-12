import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getRecipeById, deleteRecipe } from "../services/recipeService";
import { useAuth } from "../context/AuthContext";

const RecipeDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadRecipe = async () => {
      try {
        const data = await getRecipeById(id);

        if (isMounted) {
          setRecipe(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    void loadRecipe();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this recipe?");

    if (!confirmDelete) return;

    try {
      await deleteRecipe(id);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) return <h1 className="text-center mt-20">Loading...</h1>;

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[420px] object-cover"
        />

        <div className="p-8">
          <h1 className="text-5xl font-bold text-gray-900">{recipe.title}</h1>

          <p className="mt-4 text-lg text-gray-600 leading-8">
            {recipe.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium">
              🍽 {recipe.category}
            </span>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
              🌍 {recipe.cuisine}
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
              ⭐ {recipe.difficulty}
            </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
              ⏱ {recipe.cookingTime} mins
            </span>
          </div>

          <hr className="my-8" />

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              🥬 Ingredients
            </h2>

            <ul className="space-y-3">
              {recipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span className="text-orange-500 text-xl">•</span>

                  {item}
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-8" />

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              👨‍🍳 Instructions
            </h2>

            <div className="space-y-5">
              {recipe.instructions.map((step, index) => (
                <div
                  key={index}
                  className="bg-orange-50 border border-orange-100 rounded-xl p-5"
                >
                  <h3 className="font-bold text-orange-600 mb-2">
                    Step {index + 1}
                  </h3>

                  <p className="text-gray-700 leading-7">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {user && recipe.createdBy?._id === user._id && (
            <div className="flex gap-4 mt-10">
              <Link
                to={`/edit/${recipe._id}`}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
              >
                Edit Recipe
              </Link>

              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Delete Recipe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
