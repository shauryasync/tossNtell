import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-3xl font-bold text-orange-600">
          TossnTell
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-orange-500 font-medium"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/create-recipe"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Create Recipe
              </Link>

              <Link
                to="/profile"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
