import { body } from "express-validator";

export const registerValidator = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
]

export const loginValidator = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
]
