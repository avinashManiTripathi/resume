import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { config } from './config';
import { database } from './config/database';
import pdfRoutes from './routes/pdf.routes';
import tailorRoutes from './routes/tailor.routes';
import authRoutes from './routes/auth.routes';
import subscriptionRoutes from './routes/subscription.routes';
import paymentRoutes from './routes/payment.routes';
import atsRoutes from './routes/ats.routes';
import templateRoutes from './routes/template.routes';
import resumeRoutes from './routes/resume.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { configurePassport } from './config/passport';

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializePassport();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    /**
     * Initialize database connection
     */
    private async initializeDatabase(): Promise<void> {
        try {
            await database.connect();
        } catch (error) {
            console.error('Failed to connect to database:', error);
            // Don't exit process, let app run without database
        }
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

        // Cookie parser
        this.app.use(cookieParser());

        // Session
        this.app.use(session({
            secret: process.env.SESSION_SECRET || 'your-session-secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            },
        }));

        // Request logging
        this.app.use(requestLogger);
    }

    /**
     * Initialize Passport
     */
    private initializePassport(): void {
        configurePassport();
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    /**
     * Initialize routes
     */
    private initializeRoutes(): void {
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            const dbStatus = database.getConnectionStatus();
            res.json({
                status: dbStatus ? 'healthy' : 'degraded',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                database: {
                    connected: dbStatus,
                    status: dbStatus ? 'connected' : 'disconnected'
                }
            });
        });

        // API routes
        this.app.use('/api', pdfRoutes);

        // Tailor routes
        this.app.use('/api/tailor', tailorRoutes);

        // Auth routes
        this.app.use('/api/auth', authRoutes);

        // Subscription routes
        this.app.use('/api/subscription', subscriptionRoutes);

        // Payment routes
        this.app.use('/api/payment', paymentRoutes);

        // ATS routes
        this.app.use('/api/ats', atsRoutes);

        // Template routes
        this.app.use('/api/templates', templateRoutes);

        // Resume extraction routes
        this.app.use('/api/resume', resumeRoutes);

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
