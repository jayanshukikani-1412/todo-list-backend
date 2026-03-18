import type { NextFunction, Response } from "express";
import type { APIResponse, AuthRequest } from "../types/index.ts";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export const validateHandler = (req: AuthRequest, res: Response<APIResponse<null>>, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createHttpError(400, "Validation failed", { errors: errors.array().map((e) => ({ field: e.type, message: e.msg })) }));
    }
    next();
}