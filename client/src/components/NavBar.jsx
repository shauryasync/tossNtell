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
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link
            to="/"
            className="text-3xl font-extrabold text-orange-600 text-center md:text-left"
          >
            TossnTell
          </Link>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-600 font-medium transition"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/create-recipe"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Create Recipe
                </Link>

                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-600 font-medium transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
