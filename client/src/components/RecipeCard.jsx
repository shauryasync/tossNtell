import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold">{recipe.title}</h2>

        <p className="text-gray-600 mt-2 line-clamp-2">{recipe.description}</p>

        <div className="flex justify-between mt-5 text-sm text-gray-500">
          <span>🍽 {recipe.category}</span>

          <span>⏱ {recipe.cookingTime} min</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
