import type { NextFunction, Response } from "express";
import type { APIResponse, AuthRequest } from "../types/index.ts";
import createHttpError from "http-errors";

export const notFound = (req: AuthRequest, res: Response<APIResponse<null>>, next: NextFunction) => {
    return next(createHttpError(404, "API Route not found"));
}