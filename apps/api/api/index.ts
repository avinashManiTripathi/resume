import { App } from '../src/app';

const appInstance = new App();
const app = appInstance.app;

// Vercel Serverless Function Handler
export default app;
