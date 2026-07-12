import { useEffect, useState } from "react";

import RecipeCard from "../components/RecipeCard";

import { getRecipes } from "../services/recipeService";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();

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

  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-10">Discover Recipes</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
