import type { NextFunction, Response } from "express";
import type { APIResponse, AuthRequest } from "../types/index.ts";
import User from "../models/user.model.ts";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/env-config.ts";

export const register = async (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return next(createHttpError(400, "User with this email already exists"))
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ firstName, lastName, email, password: hashPassword })

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
    })
}

export const login = async (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        return next(createHttpError(400, "Invalid email or password"))
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) {
        return next(createHttpError(400, "Invalid email or password"))
    }

    const expiresIn = ENV_CONFIG.JWT_EXPIRES_IN || "15m";

    const token = jwt.sign(
        {
            userId: existingUser._id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
        },
        ENV_CONFIG.JWT_SECRET,
        { expiresIn } as jwt.SignOptions
    );

    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token,
            _id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            createdAt: existingUser.createdAt,
            updatedAt: existingUser.updatedAt,
        },
    })
}