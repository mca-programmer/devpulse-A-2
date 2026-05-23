import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/**
 * API Routes
 */
app.use("/api", router);

/**
 * Global Error Handler 
 */
app.use(globalErrorHandler);

export default app;