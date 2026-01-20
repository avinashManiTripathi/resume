
import dotenv from 'dotenv';
import path from 'path';
import { database } from '../src/config/database';
import { CoverLetterTemplate } from '../src/models/CoverLetterTemplates';
import { COVER_LETTER_TEMPLATES } from '../src/constants/coverLetterTemplates';

// Load environment variables
dotenv.config({
    path: path.join(__dirname, '../../.env')
});

async function seedTemplates() {
    try {
        console.log('🌱 Starting cover letter templates seed...');

        // Connect to database
        await database.connect();

        // Process each template
        for (const template of COVER_LETTER_TEMPLATES) {
            console.log(`Processing template: ${template.name}`);

            await CoverLetterTemplate.findOneAndUpdate(
                { type: template._id }, // Search by friendly ID (mapped to type)
                {
                    type: template._id,
                    name: template.name,
                    category: template.category || 'professional',
                    image: template.image,
                    description: template.description,
                    previewText: template.previewText,
                    supportedFields: template.supportedFields,
                    templateBody: Array.isArray(template.templateBody)
                        ? template.templateBody.join('\n')
                        : template.templateBody
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }

        console.log('✅ Cover letter templates seeded successfully');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding templates:', error);
        process.exit(1);
    }
}

seedTemplates();
