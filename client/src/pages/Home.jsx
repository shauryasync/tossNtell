import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRecipes } from "../services/recipeService";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const fetchRecipes = async () => {
    try {
      setLoading(true);

      const data = await getRecipes({
        search,
        category,
        difficulty,
      });

      setRecipes(data.recipes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center mt-20 text-2xl font-semibold text-gray-700">
        Loading Recipes...
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Discover Recipes</h1>

          <p className="text-gray-600 mt-2">
            Find recipes shared by the community.
          </p>
        </div>

        {/* Search Section */}

        <div className="bg-white rounded-2xl shadow-md p-5 mb-10">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="🔍 Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
            >
              <option value="">All Categories</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-orange-500"
            >
              <option value="">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              onClick={fetchRecipes}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Recipe Grid */}

        {recipes.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No recipes found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
