import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import RecipeCard from "../components/RecipeCard";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data.user);
      setRecipes(data.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h2 className="text-center mt-20 text-2xl">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>

          <div className="mt-6 space-y-3">
            <p className="text-lg text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>

            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>

            <p className="text-lg text-gray-700">
              <strong>Recipes Created:</strong> {recipes.length}
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">My Recipes</h2>

        {recipes.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow">
            <p className="text-gray-600">
              You haven't created any recipes yet.
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

export default Profile;
