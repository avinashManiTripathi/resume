/**
 * Environment Variable Diagnostic Script
 * Run this to see what environment variables are being loaded
 */

console.log('='.repeat(60));
console.log('ENVIRONMENT VARIABLE DIAGNOSTIC');
console.log('='.repeat(60));

console.log('\n📍 Node Environment:', process.env.NODE_ENV);
console.log('📍 Platform:', process.platform);
console.log('📍 Node Version:', process.version);

console.log('\n' + '='.repeat(60));
console.log('CRITICAL ENVIRONMENT VARIABLES');
console.log('='.repeat(60));

const criticalVars = [
    'MONGODB_URI',
    'PORT',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GENAI_API_KEY',
    'JWT_SECRET',
    'SESSION_SECRET',
    'STRIPE_SECRET_KEY',
    'CORS_ORIGIN',
];

criticalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        // Mask sensitive values
        const maskedValue = varName.includes('SECRET') || varName.includes('KEY') || varName.includes('URI')
            ? `${value.substring(0, 10)}...${value.substring(value.length - 4)}`
            : value;
        console.log(`✅ ${varName}: ${maskedValue}`);
    } else {
        console.log(`❌ ${varName}: NOT SET`);
    }
});

console.log('\n' + '='.repeat(60));
console.log('ALL ENVIRONMENT VARIABLES');
console.log('='.repeat(60));

const allEnvKeys = Object.keys(process.env).filter(key =>
    !key.startsWith('npm_') &&
    !key.startsWith('_') &&
    key !== 'PATH'
);

console.log(`\nTotal environment variables: ${allEnvKeys.length}`);
console.log('Variables set:', allEnvKeys.join(', '));

console.log('\n' + '='.repeat(60));
console.log('RAILWAY DETECTION');
console.log('='.repeat(60));

const isRailway = process.env.RAILWAY_ENVIRONMENT !== undefined;
console.log('Running on Railway:', isRailway ? 'YES ✅' : 'NO ❌');
if (isRailway) {
    console.log('Railway Environment:', process.env.RAILWAY_ENVIRONMENT);
    console.log('Railway Project ID:', process.env.RAILWAY_PROJECT_ID);
}

console.log('\n' + '='.repeat(60));
console.log('CONCLUSION');
console.log('='.repeat(60));

if (!process.env.MONGODB_URI) {
    console.log('\n⚠️  WARNING: MONGODB_URI is NOT set!');
    console.log('   The app will use default: mongodb://localhost:27017/resume-builder');
    console.log('   This will FAIL on Railway because there is no local MongoDB.');
    console.log('\n   TO FIX:');
    console.log('   1. Go to Railway dashboard');
    console.log('   2. Click your service → Variables tab');
    console.log('   3. Add variable: MONGODB_URI');
    console.log('   4. Set value to your MongoDB Atlas connection string');
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('\n⚠️  INFO: Google OAuth not configured');
    console.log('   This is OK - app will run without Google authentication');
}

console.log('\n' + '='.repeat(60));
