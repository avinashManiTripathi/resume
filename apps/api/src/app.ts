import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config';
import pdfRoutes from './routes/pdf.routes';
import tailorRoutes from './routes/tailor.routes';
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
    }

    /**
     * Initialize routes
     */
    private initializeRoutes(): void {
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });

        // API routes
        this.app.use('/api', pdfRoutes);

        // Tailor routes
        this.app.use('/api/tailor', tailorRoutes);

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
