import mongoose from 'mongoose';


// Global variable to cache the connection across invocations in serverless environment
let cachedConnection: typeof mongoose | null = null;
let isConnecting = false; // Flag to prevent multiple simultaneous connection attempts

class Database {
    private static instance: Database;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<typeof mongoose> {
        // If we have a cached connection, check if it's still alive
        if (cachedConnection && mongoose.connection.readyState === 1) {
            console.log('📦 Using cached MongoDB connection');
            return cachedConnection;
        }

        // If a connection is already in progress, wait for it
        if (isConnecting) {
            console.log('⏳ Waiting for existing connection attempt to complete...');
            // Simple wait logic - could be improved with an event emitter or promise if needed
            // For now, allow the logic to proceed to the check loop or throw/wait.
            // In a strict serverless env without top-level await, this is tricky.
            // Best effort: wait a short bit.
            await new Promise(resolve => setTimeout(resolve, 500));
            if (cachedConnection && mongoose.connection.readyState === 1) {
                return cachedConnection;
            }
        }

        isConnecting = true;

        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-builder';

            // Serverless optimization: bufferCommands false helps fail fast if no connection,
            // but for Mongoose usually we want buffering.
            // However, maxPoolSize 1 is crucial for serverless to avoid exhausting Atlas limits.
            const opts = {
                maxPoolSize: 1, // Restrict pool size for serverless
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false, // Disable buffering for serverless to verify connection reliably
            };

            console.log('🔌 Connecting to MongoDB...');
            cachedConnection = await mongoose.connect(mongoUri, opts);

            isConnecting = false;
            console.log('✅ MongoDB connected successfully');
            console.log(`📍 Database: ${mongoose.connection.name}`);

            // Connection event listeners
            mongoose.connection.on('error', (error) => {
                console.error('❌ MongoDB connection error:', error);
                cachedConnection = null;
            });

            mongoose.connection.on('disconnected', () => {
                console.log('⚠️  MongoDB disconnected');
                cachedConnection = null;
            });

            return cachedConnection;

        } catch (error) {
            isConnecting = false;
            console.error('❌ MongoDB connection failed:', error);
            cachedConnection = null;
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        if (!cachedConnection) {
            return;
        }

        try {
            await mongoose.disconnect();
            cachedConnection = null;
            console.log('👋 MongoDB disconnected gracefully');
        } catch (error) {
            console.error('❌ Error disconnecting from MongoDB:', error);
            throw error;
        }
    }

    public getConnectionStatus(): boolean {
        return !!cachedConnection && mongoose.connection.readyState === 1;
    }

    public getConnection(): typeof mongoose {
        return mongoose;
    }
}

export const database = Database.getInstance();
