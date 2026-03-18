import type { NextFunction, Response } from "express";
import type { APIResponse, AuthRequest } from "../types/index.ts";
import Todo from "../models/todo.model.ts";
import createHttpError from "http-errors";

export const createTodo = async (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const { title, description, status } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return next(createHttpError(401, "Unauthorized: User ID is required"))
    }

    const todo = await Todo.create({ title, description, status, user: userId });

    return res.status(201).json({
        success: true,
        message: "Todo created successfully",
        data: todo,
    })
}

export const getTodos = async (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) {
        return next(createHttpError(401, "Unauthorized: User ID is required"))
    }

    const todos = await Todo.find({ user: userId }, { __v: 0 }).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        message: "Todos fetched successfully",
        data: todos,
    })
}

export const getTodoById = async (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) {
        return next(createHttpError(401, "Unauthorized: User ID is required"))
    }

    const todoId = req.params.id;
    if (!todoId) {
        return next(createHttpError(400, "Todo ID is required"))
    }

    const todo = await Todo.findById(todoId, { __v: 0 });
    if (!todo) {
        return next(createHttpError(404, "Todo not found"))
    }
    if (todo.user.toString() !== userId) {
        return next(createHttpError(403, "Forbidden: You are not authorized to access this todo"))
    }
    return res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        data: todo,
    })
}

export const updateTodo = async (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) {
        return next(createHttpError(401, "Unauthorized: User ID is required"))
    }

    const todoId = req.params.id;
    if (!todoId) {
        return next(createHttpError(400, "Todo ID is required"))
    }

    const todo = await Todo.findById(todoId, { __v: 0 });
    if (!todo) {
        return next(createHttpError(404, "Todo not found"))
    }
    if (todo.user.toString() !== userId) {
        return next(createHttpError(403, "Forbidden: You are not authorized to update this todo"))
    }
    const { title, description, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title, description, status }, { new: true, __v: 0, user: 0 });
    if (!updatedTodo) {
        return next(createHttpError(404, "Todo not found"))
    }
    return res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: updatedTodo,
    })
}

export const deleteTodo = async (req: AuthRequest, res: Response<APIResponse>, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) {
        return next(createHttpError(401, "Unauthorized: User ID is required"))
    }
    const todoId = req.params.id;
    if (!todoId) {
        return next(createHttpError(400, "Todo ID is required"))
    }
    const todo = await Todo.findById(todoId, { __v: 0, });
    if (!todo) {
        return next(createHttpError(404, "Todo not found"))
    }
    if (todo.user.toString() !== userId) {
        return next(createHttpError(403, "Forbidden: You are not authorized to delete this todo"))
    }
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
        return next(createHttpError(404, "Todo not found"))
    }
    return res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        data: null,
    })
}