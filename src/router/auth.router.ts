import express from "express";
import { validateHandler } from "../validator/validator.ts";
import { loginValidator, registerValidator } from "../validator/auth.ts";
import { login, register } from "../controller/auth.ts";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, validateHandler, register)
authRouter.post("/login", loginValidator, validateHandler, login)

export default authRouter;