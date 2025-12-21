import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
    });

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        timestamp: new Date().toISOString(),
    });
};

/**
 * 404 Not Found middleware
 */
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.status(404).json({
        error: 'Route not found',
        path: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
    });
};
