import express from "express";
import cors from "cors";
import { notFound } from "./middleware/not-found.ts";
import { globalErrorHandler } from "./middleware/global-error-handler.ts";
import authRouter from "./router/auth.router.ts";
import todoRouter from "./router/todo.router.ts";

const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: "http://localhost:3000",
    }))

    app.get("/api/health", (req, res) => {
        res.json({ success: true, message: "Server is running" });
    });

    app.use("/api/auth", authRouter);
    app.use("/api/todo", todoRouter);

    app.use(notFound);
    app.use(globalErrorHandler);

    return app;
}

export default createApp;