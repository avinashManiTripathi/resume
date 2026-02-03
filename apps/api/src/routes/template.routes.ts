import { Router, Request, Response } from 'express';
import { Template, TemplateType, TemplateCategory } from '../models';

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
