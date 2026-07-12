import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          TossnTell
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>

          {user && (
            <>
              <Link to="/create-recipe">Create Recipe</Link>

              <Link to="/profile">Profile</Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link to="/login">Login</Link>

              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
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
