import dotenv from 'dotenv';
dotenv.config();

import { App } from './app';
import { database } from './config/database';
import { initAI } from './services/ai-analysis.service';

console.log("Environment: Changed to ", process.env.NODE_ENV);
console.log('\n' + '='.repeat(50));
console.log('🔍 ENVIRONMENT VARIABLE CHECK');
console.log('='.repeat(50));
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ NOT SET (will use localhost)');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ NOT SET');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ NOT SET');
console.log('GENAI_API_KEY:', process.env.GENAI_API_KEY ? '✅ Set' : '❌ NOT SET');
console.log('PORT:', process.env.PORT || '4000 (default)');
console.log('='.repeat(50) + '\n');

import { preWarmPuppeteer } from '@repo/utils-server';

// Create and start the application
const app = new App();
if (process.env.GENAI_API_KEY) {
    initAI(process.env.GENAI_API_KEY);
}

// Pre-warm puppeteer in background
preWarmPuppeteer().catch(err => console.error("Failed to pre-warm puppeteer:", err));

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
