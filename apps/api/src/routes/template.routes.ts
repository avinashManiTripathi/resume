import { Router, Request, Response } from 'express';
import { Template, TemplateType, TemplateCategory } from '../models';
import { uploadTemplateImage } from '../middleware/upload.middleware';
import path from 'path';
import fs from 'fs';

const router = Router();

// Get all templates
router.get('/', async (req: Request, res: Response) => {
    try {
        const { type, category, isPremium, isActive } = req.query;

        const filter: any = {};
        if (type) filter.type = type;
        if (category) filter.category = category;
        if (isPremium !== undefined) filter.isPremium = isPremium === 'true';
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const templates = await Template.find(filter)
            .select('-htmlContent -cssContent') // Exclude large content in list view
            .sort({ sortOrder: 1, createdAt: -1 });

        res.json({ templates, count: templates.length });
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

// Get single template by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const template = await Template.findById(req.params.id);

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
        const template = await Template.create(req.body);
        res.status(201).json({ template, message: 'Template created successfully' });
    } catch (error: any) {
        console.error('Error creating template:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Template with this name already exists' });
        }
        res.status(500).json({ error: 'Failed to create template' });
    }
});

// Update template
router.put('/:id', async (req: Request, res: Response) => {
    try {

        const template = await Template.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        res.json({ template, message: 'Template updated successfully' });
    } catch (error: any) {
        console.error('Error updating template:', error);
        console.error('Error details:', error.message);
        if (error.errors) {
            console.error('Validation errors:', error.errors);
        }
        res.status(500).json({
            error: 'Failed to update template',
            details: error.message,
            validationErrors: error.errors
        });
    }
});

// Delete template
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const template = await Template.findByIdAndDelete(req.params.id);

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
router.post('/upload/:id', uploadTemplateImage.single('image'), async (req: Request, res: Response) => {
    try {
        const templateId = req.params.id;

        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Get template to check if it exists
        const template = await Template.findById(templateId);
        if (!template) {
            // Delete uploaded file if template doesn't exist
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ error: 'Template not found' });
        }

        // Delete old image file if it exists and is a file path (not base64)
        if (template.thumbnail && !template.thumbnail.startsWith('data:')) {
            const oldImagePath = path.join(__dirname, '../../public', template.thumbnail);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update template with new image path
        const imagePath = `/uploads/templates/${req.file.filename}`;
        template.thumbnail = imagePath;
        await template.save();

        res.json({
            message: 'Image uploaded successfully',
            thumbnail: imagePath,
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

// Search templates
router.get('/search/:query', async (req: Request, res: Response) => {
    try {
        const templates = await Template.find(
            { $text: { $search: req.params.query } },
            { score: { $meta: 'textScore' } }
        )
            .select('-htmlContent -cssContent')
            .sort({ score: { $meta: 'textScore' } });

        res.json({ templates, count: templates.length });
    } catch (error) {
        console.error('Error searching templates:', error);
        res.status(500).json({ error: 'Failed to search templates' });
    }
});

export default router;
