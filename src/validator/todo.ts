import { body } from "express-validator";

export const createTodoValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("status").notEmpty().withMessage("Status is required").isIn(["pending", "completed", "in_progress"]).withMessage("Invalid status"),
]

export const updateTodoValidator = [
    body("title").optional().notEmpty().withMessage("Title is required"),
    body("description").optional().notEmpty().withMessage("Description is required"),
    body("status").optional().notEmpty().withMessage("Status is required").isIn(["pending", "completed", "in_progress"]).withMessage("Invalid status"),
]