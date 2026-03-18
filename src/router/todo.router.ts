import express from "express";
import { jwtHandler } from "../middleware/jwt-handler.ts";
import { validateHandler } from "../validator/validator.ts";
import { createTodoValidator, updateTodoValidator } from "../validator/todo.ts";
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controller/todo.ts";

const todoRouter = express.Router();

todoRouter.post("/create-todo", jwtHandler, createTodoValidator, validateHandler, createTodo)
todoRouter.get("/get-todos", jwtHandler, getTodos)
todoRouter.get("/get-todo/:id", jwtHandler, getTodoById)
todoRouter.put("/update-todo/:id", jwtHandler, updateTodoValidator, validateHandler, updateTodo)
todoRouter.delete("/delete-todo/:id", jwtHandler, deleteTodo)

export default todoRouter;