import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config';
import pdfRoutes from './routes/pdf.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    /**
     * Initialize middlewares
     */
    private initializeMiddlewares(): void {
        // CORS
        this.app.use(cors({
            origin: config.corsOrigin,
            credentials: true,
        }));

        // Body parser
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

        // Request logging
        this.app.use(requestLogger);

        // Health check (before other routes)
        this.app.get('/', (req, res) => {
            res.json({
                status: 'ok',
                message: 'Resume PDF API is running',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
            });
        });
    }

    /**
     * Initialize routes
     */
    private initializeRoutes(): void {
        // API routes
        this.app.use('/api', pdfRoutes);

        // Legacy route (for backward compatibility)
        this.app.use('/', pdfRoutes);
    }

    /**
     * Initialize error handling
     */
    private initializeErrorHandling(): void {
        // 404 handler
        this.app.use(notFoundHandler);

        // Global error handler
        this.app.use(errorHandler);
    }

    /**
     * Start the server
     */
    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`🚀 Server running on http://localhost:${config.port}`);
            console.log(`📝 Environment: ${config.nodeEnv}`);
            console.log(`⏰ Started at: ${new Date().toISOString()}`);
        });
    }
}
