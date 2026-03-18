import type { Request } from "express";

export interface IJWTUserPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
}

// This is a custom request type that extends the Request type from express. It adds a user property to the request object.
export interface AuthRequest extends Request {
    user?: IJWTUserPayload;
}

export interface APIResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: Record<string, string>[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}