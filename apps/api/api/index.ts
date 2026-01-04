import { createApp } from '../src/app';
import { database } from '../src/config/database';
import { initAI } from '../src/utils-server/ai-analysis';
require('dotenv').config();

// Initialize AI
initAI(process.env.GOOGLE_API_KEY as string);

// Create the Express app
const app = createApp();

// Initialize database connection (async)
database.connect().catch(error => {
    console.error('Failed to connect to database:', error);
});

// Export the Express app as a serverless function
export default app;
