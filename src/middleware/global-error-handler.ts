import type { APIResponse, AuthRequest } from "../types/index.ts";
import type { Response } from "express";
import type { NextFunction } from "express";

export const globalErrorHandler = (err: any, req: AuthRequest, res: Response<APIResponse<null>>, next: NextFunction) => {
    const statusCode = err.status || err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.errors || [],
    })
}