import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { config } from './config';
import dotenv from 'dotenv';
import { initAI } from './services/ai-analysis.service';
import { preWarmPuppeteer } from '@repo/utils-server';
import { initAI as initInterviewAI } from './services/interview.service';
import { database } from './config/database';
import pdfRoutes from './routes/pdf.routes';
import tailorRoutes from './routes/tailor.routes';
import authRoutes from './routes/auth.routes';
import subscriptionRoutes from './routes/subscription.routes';
import paymentRoutes from './routes/payment.routes';
import atsRoutes from './routes/ats.routes';
import templateRoutes from './routes/template.routes';
import resumeRoutes from './routes/resume.routes';
import landingRoutes from './routes/landing.routes';
import coverLetterRoutes from './routes/cover-letter.routes';
import interviewRoutes from './routes/interview.routes';
import blogRoutes from './routes/blog.routes';
import coverLetterTemplateRoutes from './routes/cover-letter-template.routes';
import adminRoutes from './routes/admin.routes';
import plansRoutes from './routes/plans.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { configurePassport } from './config/passport';
import { setupInterviewSocket } from './sockets/interview.socket';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Load environment variables from .env file
dotenv.config();

export class App {
    public app: Application;
    public httpServer: HttpServer;
    public io: SocketIoServer;

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);

        // Initialize Socket.io with CORS configuration
        this.io = new SocketIoServer(this.httpServer, {
            cors: {
                origin: [
                    'https://hirecta.com',
                    'https://www.hirecta.com',
                    'https://editor.hirecta.com',
                    'https://auth.hirecta.com',
                    'https://admin.hirecta.com',
                    'https://interview.hirecta.com',
                    'http://localhost:3000',
                    'http://localhost:3001',
                    'http://localhost:3002',
                    'http://localhost:3005'
                ],
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializePassport();
        this.initializeRoutes();
        this.initializeSockets();
        this.initializeErrorHandling();
    }

    /**
     * Initialize database connection
     */
    private async initializeDatabase(): Promise<void> {
        try {
            await database.connect();

            // Temporary migration: Drop the stale 'id_1' index from coverlettertemplates if it exists
            // This fixes the 'duplicate key error' when creating templates with the new schema (where id is replaced by type)
            try {
                const mongoose = require('mongoose');
                if (mongoose.connection.readyState === 1) {
                    await mongoose.connection.collection('coverlettertemplates').dropIndex('id_1');
                    console.log('NOTE: Dropped stale "id_1" index from coverlettertemplates collection.');
                }
            } catch (err: any) {
                // Ignore error if index doesn't exist (code 27)
                if (err.code !== 27) {
                    console.log('Note: Attempted to drop id_1 index but failed (usually harmless):', err.message);
                }
            }
        } catch (error) {
            console.error('Failed to connect to database:', error);
            // Don't exit process, let app run without database
        }
    }

    /**
     * Initialize middlewares
     */

    private initializeMiddlewares(): void {
        // Trust Proxy (for Rate Limiting behind load balancers/proxies like Railway/Nginx)
        this.app.set('trust proxy', 1);

        // Security headers
        this.app.use(helmet({
            crossOriginResourcePolicy: { policy: "cross-origin" } // Allow resources to be loaded cross-origin (e.g. PDFs)
        }));

        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 300, // Limit each IP to 300 requests per windowMs
            standardHeaders: true,
            legacyHeaders: false,
            message: 'Too many requests from this IP, please try again after 15 minutes'
        });

        // Apply rate limiting to API routes only
        this.app.use('/api', limiter);

        // CORS
        const allowedOrigins = [
            'https://hirecta.com',
            'https://www.hirecta.com',
            'https://editor.hirecta.com',
            'https://auth.hirecta.com',
            'https://admin.hirecta.com',
            'https://interview.hirecta.com',
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3005'
        ];

        this.app.use(cors({
            origin: (origin, callback) => {
                // Allow requests with no origin (like mobile apps or curl)
                if (!origin) return callback(null, true);

                // Check allowed origins list
                if (allowedOrigins.indexOf(origin) !== -1) {
                    return callback(null, true);
                }

                // Check dynamic patterns
                if (
                    origin.endsWith('.hirecta.com') ||     // Production subdomains
                    origin.endsWith('.up.railway.app') ||  // Railway deployments
                    origin.match(/^http:\/\/localhost:\d+$/) // Any localhost port
                ) {
                    return callback(null, true);
                }

                // Check environment config
                if (config.corsOrigin === '*') {
                    return callback(null, true);
                }

                if (config.corsOrigin && config.corsOrigin.split(',').includes(origin)) {
                    return callback(null, true);
                }

                console.error('CORS blocked origin:', origin);
                callback(new Error('Not allowed by CORS'));
            },
            credentials: true,
        }));

        // Body parser with raw body capture for webhooks
        this.app.use(bodyParser.json({
            limit: '10mb',
            verify: (req: any, res, buf) => {
                req.rawBody = buf;
            }
        }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

        // Cookie parser
        this.app.use(cookieParser());

        console.log({ GENAI_API_KEY: process.env.GENAI_API_KEY })

        if (process.env.GENAI_API_KEY) {
            initAI(process.env.GENAI_API_KEY);
            initInterviewAI(process.env.GENAI_API_KEY);

            // Pre-warm Puppeteer in background
            preWarmPuppeteer().catch((err: any) => console.error('Puppeteer pre-warm failed:', err));
        }

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

        // Static file serving for uploads
        const path = require('path');
        this.app.use('/uploads', require('express').static(path.join(__dirname, '../public/uploads')));

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

        // Plans routes
        this.app.use('/api/plans', plansRoutes);

        // ATS routes
        this.app.use('/api/ats', atsRoutes);

        // Template routes
        this.app.use('/api/templates', templateRoutes);

        // Resume extraction routes
        this.app.use('/api/resume', resumeRoutes);

        // Blog routes
        this.app.use('/api/blog', blogRoutes);

        // Landing page routes
        this.app.use('/api/landing', landingRoutes);

        // Cover letter routes
        this.app.use('/api/cover-letter', coverLetterRoutes);

        // Interview routes
        this.app.use('/api/interview', interviewRoutes);

        // Cover letter template routes (Admin)
        this.app.use('/api/cover-letter-templates', coverLetterTemplateRoutes);

        // General Admin routes
        this.app.use('/api/admin', adminRoutes);

        // Legacy route (for backward compatibility)
        this.app.use('/', pdfRoutes);
    }





    /**
     * Initialize WebSocket handlers
     */
    private initializeSockets(): void {
        setupInterviewSocket(this.io);
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
        this.httpServer.listen(config.port, () => {
            console.log(`🚀 Server running on http://localhost:${config.port}`);
            console.log(`🔌 WebSockets enabled`);
            console.log(`📝 Environment: ${config.nodeEnv}`);
            console.log(`⏰ Started at: ${new Date().toISOString()}`);
        });
    }
}
