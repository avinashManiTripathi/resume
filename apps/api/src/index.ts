import { App } from './app';
require('dotenv').config()
import { initAI } from '@repo/utils-server';
initAI(process.env.GOOGLE_API_KEY as string);


// Create and start the application
const app = new App();
app.listen();

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
