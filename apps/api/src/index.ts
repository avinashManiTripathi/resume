import { App } from './app';
import { database } from './config/database';
import dotenv from 'dotenv';
import { initAI } from './services/ai-analysis.service';
dotenv.config();

console.log("Environment: ", process.env.NODE_ENV);

// Create and start the application
const app = new App();
if (process.env.GENAI_API_KEY) {
    initAI(process.env.GENAI_API_KEY);
}
app.listen();





// Gracef   ul shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await database.disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await database.disconnect();
    process.exit(0);
});
