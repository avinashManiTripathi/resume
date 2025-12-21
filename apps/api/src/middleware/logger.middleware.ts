import { Request, Response, NextFunction } from 'express';

/**
 * Request logging middleware
 */
export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const start = Date.now();

    // Log when response finishes
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log({
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString(),
            userAgent: req.get('user-agent'),
            ip: req.ip,
        });
    });

    next();
};
