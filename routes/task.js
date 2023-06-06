import express from "express";
import { isAuthenticated } from "../middlewares/auth.js"
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTasks);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;