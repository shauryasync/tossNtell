import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "https://toss-ntell.vercel.app/",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api", recipeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
