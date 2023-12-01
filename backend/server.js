import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

connectDB();
