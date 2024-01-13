import express from "express";
import { check } from "express-validator";
import {
  createTask,
  deleteTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "../controllers/tasks.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/", getTasks);
router.get("/:taskId", getTaskById);

router.post(
  "/",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  createTask
);
router.patch(
  "/:taskId",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  updateTask
);
router.patch("/:taskId/status", updateTaskStatus);
router.delete("/:taskId", deleteTask);

export default router;
