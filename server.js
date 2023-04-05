import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

// configure env
dotenv.config();

// connect database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(morgan("dev")); // logs the api endpoints visited
app.use(express.json());
app.use(cors());

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to shopkart",
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`.bgCyan));
