import { App } from './app';
import { database } from './config/database';
require('dotenv').config()

// Create and start the application
const app = new App();
app.listen();

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
