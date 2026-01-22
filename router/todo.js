import express from "express";
import * as todoController from "../controller/todo.js";
const router = express.Router();

router.get("/", todoController.getTodos);

router.post("/", todoController.createTodo);

router.delete("/:id", todoController.removeTodo);

router.patch("/:id", todoController.checkTodo);

export default router;
