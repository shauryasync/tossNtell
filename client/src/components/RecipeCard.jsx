import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const image =
    recipe.image && recipe.image.trim() !== ""
      ? recipe.image
      : "https://placehold.co/600x400/F59E0B/FFFFFF?text=No+Image";

  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={recipe.title}
          className="w-full h-52 sm:h-56 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
          {recipe.title}
        </h2>

        <p className="text-gray-600 text-sm leading-6 line-clamp-2 min-h-[48px]">
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
            {recipe.category}
          </span>

          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t">
          <span className="text-gray-700 font-medium">
            ⏱ {recipe.cookingTime} mins
          </span>

          <span className="text-orange-600 font-semibold">View →</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
