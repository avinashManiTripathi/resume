"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("../src/config/database");
const CoverLetterTemplates_1 = require("../src/models/CoverLetterTemplates");
const coverLetterTemplates_1 = require("../src/constants/coverLetterTemplates");
// Load environment variables
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env')
});
async function seedTemplates() {
    try {
        console.log('🌱 Starting cover letter templates seed...');
        // Connect to database
        await database_1.database.connect();
        // Process each template
        for (const template of coverLetterTemplates_1.COVER_LETTER_TEMPLATES) {
            console.log(`Processing template: ${template.name}`);
            await CoverLetterTemplates_1.CoverLetterTemplate.findOneAndUpdate({ type: template._id }, // Search by friendly ID (mapped to type)
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
            }, { upsert: true, new: true, setDefaultsOnInsert: true });
        }
        console.log('✅ Cover letter templates seeded successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding templates:', error);
        process.exit(1);
    }
}
seedTemplates();
