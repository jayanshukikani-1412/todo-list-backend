import express from "express";
import cors from "cors";
import authRouter from "./router/auth.rotuer.ts";

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

    return app;
}

export default createApp;