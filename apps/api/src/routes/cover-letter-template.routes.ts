import { Router, Request, Response } from 'express';
import { CoverLetterTemplate } from '../models/CoverLetterTemplates';
import { uploadCoverLetterImage } from '../middleware/upload.middleware';
import path from 'path';
import fs from 'fs';

const router = Router();

// Get all templates
router.get('/', async (req: Request, res: Response) => {
    try {
        const templates = await CoverLetterTemplate.find().sort({ createdAt: -1 });
        res.json({ templates, count: templates.length });
    } catch (error) {
        console.error('Error fetching cover letter templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

// Get single template
router.get('/:id', async (req: Request, res: Response) => {
    try {
        // Try to find by _id first, then by custom type string
        let template;
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            template = await CoverLetterTemplate.findById(req.params.id);
        }

        if (!template) {
            template = await CoverLetterTemplate.findOne({ type: req.params.id });
        }

        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        res.json({ template });
    } catch (error) {
        console.error('Error fetching template:', error);
        res.status(500).json({ error: 'Failed to fetch template' });
    }
});

// Create new template
router.post('/', async (req: Request, res: Response) => {
    try {
        // Validate unique Type
        const existing = await CoverLetterTemplate.findOne({ type: req.body.type });
        if (existing) {
            return res.status(400).json({ error: 'Template with this Type already exists' });
        }

        const template = await CoverLetterTemplate.create(req.body);
        res.status(201).json({ template, message: 'Template created successfully' });
    } catch (error: any) {
        console.error('Error creating template:', error);
        res.status(500).json({ error: 'Failed to create template', details: error.message });
    }
});

// Update template
router.put('/:id', async (req: Request, res: Response) => {
    try {
        // Try to find by _id first, then by custom type string
        let filter: any = { _id: req.params.id };
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            filter = { type: req.params.id };
        }

        const template = await CoverLetterTemplate.findOneAndUpdate(
            filter,
            req.body,
            { new: true, runValidators: true }
        );

        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        res.json({ template, message: 'Template updated successfully' });
    } catch (error: any) {
        console.error('Error updating template:', error);
        res.status(500).json({ error: 'Failed to update template', details: error.message });
    }
});



// Delete template
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let filter: any = { _id: req.params.id };
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            filter = { type: req.params.id };
        }

        const template = await CoverLetterTemplate.findOneAndDelete(filter);

        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        res.json({ message: 'Template deleted successfully' });
    } catch (error) {
        console.error('Error deleting template:', error);
        res.status(500).json({ error: 'Failed to delete template' });
    }
});

// Upload template image
router.post('/upload/:id', uploadCoverLetterImage.single('image'), async (req: Request, res: Response) => {
    try {
        const templateId = req.params.id;

        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Get template to check if it exists (by _id or type)
        let template;
        if (templateId.match(/^[0-9a-fA-F]{24}$/)) {
            template = await CoverLetterTemplate.findById(templateId);
        } else {
            template = await CoverLetterTemplate.findOne({ type: templateId });
        }

        if (!template) {
            // Delete uploaded file if template doesn't exist
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ error: 'Template not found' });
        }

        // Delete old image file if it exists and is a file path (not base64/URL)
        if (template.image && !template.image.startsWith('data:') && !template.image.startsWith('http')) {
            const oldImagePath = path.join(__dirname, '../../public', template.image);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath);
                } catch (e) {
                    console.error('Failed to delete old image:', e);
                }
            }
        }

        // Update template with new image path - standardizing on cover-letters folder
        // Multer storage already put it in public/uploads/cover-letters
        const imagePath = `/uploads/cover-letters/${req.file.filename}`;
        template.image = imagePath;
        await template.save();

        res.json({
            message: 'Image uploaded successfully',
            image: imagePath,
            template
        });
    } catch (error) {
        console.error('Error uploading template image:', error);
        // Clean up uploaded file on error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

export default router;
