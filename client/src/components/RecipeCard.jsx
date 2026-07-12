import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
    >
      <img
        src={
          recipe.image && recipe.image.trim() !== ""
            ? recipe.image
            : "https://placehold.co/600x400/F59E0B/FFFFFF?text=No+Image"
        }
        alt={recipe.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 bg-white">
        <h2 className="text-2xl font-bold text-[#181A18] mb-2">
          {recipe.title}
        </h2>

        <p className="text-gray-600 text-sm leading-6 min-h-[48px]">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mt-5 border-t pt-4">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            {recipe.category}
          </span>

          <span className="text-gray-700 font-medium">
            ⏱ {recipe.cookingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
