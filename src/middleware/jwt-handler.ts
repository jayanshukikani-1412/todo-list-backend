import type { NextFunction, Response } from "express";
import type { APIResponse, AuthRequest, IJWTUserPayload } from "../types/index.ts";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken"
import ENV_CONFIG from "../config/env-config.ts";

export const jwtHandler = (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const reqToken = req.headers.authorization;

    if (!reqToken || !reqToken.startsWith("Bearer")) {
        return next(createHttpError(401, "Unauthorized: No token provided"))
    }

    const token = reqToken.split(" ")[1];

    if (!token) {
        return next(createHttpError(401, "Unauthorized: No token provided"))
    }

    try {
        const decoded = jwt.verify(token, ENV_CONFIG.JWT_SECRET);
        req.user = decoded as IJWTUserPayload;
        next();
    } catch (error) {
        return next(createHttpError(401, "Unauthorized: Invalid token"))
    }
}