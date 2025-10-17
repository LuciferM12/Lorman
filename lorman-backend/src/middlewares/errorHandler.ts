import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err)
    const status = err.cause && typeof err.cause === 'number' ? err.cause : 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
}