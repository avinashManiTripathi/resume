import { Template } from '../models/Template';
const { database } = require('../config/database');

async function verifyMigration() {
    try {
        await database.connect();

        const templateName = 'Template 14';
        const template = await Template.findOne({ name: templateName });

        if (!template) {
            console.error(`❌ Template "${templateName}" not found!`);
            process.exit(1);
        }

        const content = template.htmlContent;
        console.log(`✅ Found template: "${template.name}"`);
        console.log(`📏 Content length: ${content.length} bytes`);

        // Check for hardcoded JSON
        if (content.includes('const json = {') && content.includes('"personalInfo": {')) {
            console.error('❌ Hardcoded JSON still present!');
        } else if (content.includes('// JSON data removed during migration')) {
            console.log('✅ Hardcoded JSON validation passed (marker found).');
        } else {
            console.warn('⚠️  JSON marker not found, but JSON might be gone. Please check manually.');
        }

        // Snippet
        const hydrateIndex = content.indexOf('window.hydrate =');
        const snippet = content.substring(hydrateIndex - 100, hydrateIndex + 100);
        console.log('--- Snippet around hydration ---');
        console.log(snippet);
        console.log('--------------------------------');

        await database.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Verification failed:', error);
        process.exit(1);
    }
}

verifyMigration();
