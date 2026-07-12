import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">RecipeBook</Link>

      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
