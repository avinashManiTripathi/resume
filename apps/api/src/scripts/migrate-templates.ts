import fs from 'fs';
import path from 'path';
import { Template, TemplateType, TemplateCategory } from '../models/Template';

// Use the existing database configuration
const { database } = require('../config/database');

const PUBLIC_DIR = path.join(__dirname, '../../../editor/public');

const TEMPLATE_METADATA: Record<string, { name: string; thumbnail: string; category?: TemplateCategory; type?: TemplateType }> = {
    'index.html': { name: 'Stockholm', thumbnail: '/templates/stockholm.jpg', category: TemplateCategory.GENERAL, type: TemplateType.MODERN },
    'index-2.html': { name: 'New York', thumbnail: '/templates/new-york.jpg', category: TemplateCategory.BUSINESS, type: TemplateType.PROFESSIONAL },
    'index-3.html': { name: 'London', thumbnail: '/templates/london.jpg', category: TemplateCategory.GENERAL, type: TemplateType.CLASSIC },
    'index-4.html': { name: 'Berlin', thumbnail: '/templates/berlin.jpg', category: TemplateCategory.GENERAL, type: TemplateType.MINIMAL },
    'index-5.html': { name: 'Tokyo', thumbnail: '/templates/tokyo.jpg', category: TemplateCategory.TECH, type: TemplateType.MODERN },
    'index-6.html': { name: 'Sydney', thumbnail: '/templates/sydney.jpg', category: TemplateCategory.CREATIVE, type: TemplateType.CREATIVE },
    'index-7.html': { name: 'Paris', thumbnail: '/templates/paris.jpg', category: TemplateCategory.GENERAL, type: TemplateType.MODERN },
    'index-8.html': { name: 'Toronto', thumbnail: '/templates/toronto.jpg', category: TemplateCategory.GENERAL, type: TemplateType.MODERN },
    'index-9.html': { name: 'Madrid', thumbnail: '/templates/madrid.jpg', category: TemplateCategory.BUSINESS, type: TemplateType.PROFESSIONAL },
    'index-10.html': { name: 'Dubai', thumbnail: '/templates/dubai.jpg', category: TemplateCategory.EXECUTIVE, type: TemplateType.PROFESSIONAL },
    'index-11.html': { name: 'Singapore', thumbnail: '/templates/singapore.jpg', category: TemplateCategory.TECH, type: TemplateType.MODERN },
    'index-12.html': { name: 'Amsterdam', thumbnail: '/templates/amsterdam.jpg', category: TemplateCategory.CREATIVE, type: TemplateType.CREATIVE },
    'index-13.html': { name: 'Rome', thumbnail: '/templates/rome.jpg', category: TemplateCategory.GENERAL, type: TemplateType.CLASSIC },
    'index-14.html': { name: 'Chicago', thumbnail: '/templates/chicago.jpg', category: TemplateCategory.GENERAL, type: TemplateType.MINIMAL },
    'index-15.html': { name: 'San Francisco', thumbnail: '/templates/san-francisco.jpg', category: TemplateCategory.GENERAL, type: TemplateType.MODERN },
};

function processHtmlContent(html: string): string {
    let processed = html;

    const jsonStartMarker = 'const json = {';
    const hydrateMarker = 'window.hydrate =';

    const startIndex = processed.indexOf(jsonStartMarker);
    const endIndex = processed.indexOf(hydrateMarker);

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const contentBefore = processed.substring(0, startIndex);
        const contentAfter = processed.substring(endIndex);

        processed = contentBefore + '\n    // JSON data removed during migration\n    ' + contentAfter;
    }

    const onloadRegex = /window\.onload\s*=\s*\(\)\s*=>\s*hydrate\(json\);?/;
    if (onloadRegex.test(processed)) {
        processed = processed.replace(onloadRegex, '// window.onload removed during migration');
    }

    return processed;
}

async function migrateTemplates() {
    try {
        await database.connect();

        const files = fs.readdirSync(PUBLIC_DIR).filter(file => file.startsWith('index') && file.endsWith('.html'));

        console.log(`Found ${files.length} HTML files to process.`);

        for (const file of files) {
            console.log(`Processing ${file}...`);

            const filePath = path.join(PUBLIC_DIR, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            const processedContent = processHtmlContent(content);

            const metadata = TEMPLATE_METADATA[file] || {
                name: `Template ${file.replace('index-', '').replace('.html', '').replace('index', 'Main')}`,
                thumbnail: '/templates/default.jpg',
                category: TemplateCategory.GENERAL,
                type: TemplateType.MODERN
            };

            const templateData = {
                name: metadata.name,
                type: metadata.type || TemplateType.MODERN,
                category: metadata.category || TemplateCategory.GENERAL,
                htmlContent: processedContent,
                thumbnail: metadata.thumbnail,
                isActive: true,
                isPremium: false,
                tags: ['migrated', 'html-only', metadata.name.toLowerCase()]
            };

            await Template.findOneAndUpdate(
                { name: metadata.name },
                templateData,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            console.log(`✅ Saved "${metadata.name}" (${file})`);
        }

        console.log('🎉 Migration completed successfully.');
        await database.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrateTemplates();
