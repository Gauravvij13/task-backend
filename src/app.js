import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.use(() => {
  throw new ApiError(404, "Something went wrong");
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({ message: error.message || "Something went wrong" });
});

export { app };
