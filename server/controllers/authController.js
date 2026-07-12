import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Recipe from "../models/Recipe.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    message: "Logged out successfully",
  });
};

export const getMe = async (req, res) => {
  const recipes = await Recipe.find({
    createdBy: req.user._id,
  }).sort({ createdAt: -1 });

  res.json({
    user: req.user,
    recipes,
  });
};
