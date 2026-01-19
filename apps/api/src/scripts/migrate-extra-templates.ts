import fs from 'fs';
import path from 'path';
import { Template, TemplateType, TemplateCategory } from '../models/Template';

// Use the existing database configuration
const { database } = require('../config/database');

const TEMPLATES_DIR = path.join(__dirname, '../templates');

async function migrateExtraTemplates() {
    try {
        // Connect using the shared database config
        await database.connect();

        if (!fs.existsSync(TEMPLATES_DIR)) {
            console.log('No templates directory found in api/src');
            return;
        }

        const files = fs.readdirSync(TEMPLATES_DIR).filter(file => file.endsWith('.html'));

        console.log(`Found ${files.length} extra HTML files in ${TEMPLATES_DIR}.`);

        for (const file of files) {
            console.log(`Processing ${file}...`);

            const filePath = path.join(TEMPLATES_DIR, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            let processedContent = content;

            const name = file === 'modern-csr.html' ? 'Barcelona' : `Template ${file}`;
            const thumbnail = file === 'modern-csr.html' ? '/templates/barcelona.jpg' : '/templates/default.jpg';

            // Upsert into DB
            const templateData = {
                name: name,
                type: TemplateType.MODERN,
                category: TemplateCategory.TECH,
                htmlContent: processedContent,
                thumbnail: thumbnail,
                isActive: true,
                isPremium: false,
                tags: ['migrated', 'extra', 'csr', 'barcelona']
            };

            await Template.findOneAndUpdate(
                { name: name },
                templateData,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            console.log(`✅ Saved "${name}" (${file})`);
        }

        console.log('🎉 Extra migration completed successfully.');
        await database.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Extra migration failed:', error);
        process.exit(1);
    }
}

migrateExtraTemplates();
