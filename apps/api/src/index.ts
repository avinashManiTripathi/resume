import { App } from './app';
import { database } from './config/database';
require('dotenv').config()


// Create the application
const appInstance = new App();

// For Vercel serverless deployment, export the Express app
export default appInstance.app;

// For local development, start the server
if (process.env.NODE_ENV !== 'production') {
    appInstance.listen();

    // Graceful shutdown
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
}
