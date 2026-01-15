import { Router, Request, Response } from 'express';
import { Blog } from '../models/Blog';
import { verifyToken, requireAdmin, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Get all blogs (with optional filters)
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status, category, limit = 50 } = req.query;

        const query: any = {};
        if (status) query.status = status;
        if (category) query.category = category;

        const blogs = await Blog.find(query)
            .populate('author', 'name email')
            .sort({ publishDate: -1 })
            .limit(Number(limit));

        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// Get single blog by slug (for public frontend)
router.get('/slug/:slug', async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'name email')
            .populate('relatedArticles', 'slug heroBadge title');

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        console.log({ relatedArticles: blog.relatedArticles })

        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog by slug:', error);
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// Get single blog by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'name email')
            .populate('relatedArticles', 'slug heroBadge title');

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// Create new blog (requires authentication and admin role)
router.post('/', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const {
            title,
            slug,
            description,
            heroBadge,
            category,
            tags,
            content,
            featuredImage,
            publishDate,
            relatedArticles,
            status
        } = req.body;

        // Validate required fields
        if (!title || !slug || !description || !category || !content) {
            return res.status(400).json({
                error: 'Missing required fields: title, slug, description, category, content'
            });
        }

        // Check if slug already exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            return res.status(400).json({ error: 'Slug already exists' });
        }

        const blog = new Blog({
            title,
            slug,
            description,
            heroBadge,
            category,
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : []),
            content,
            featuredImage,
            publishDate: publishDate || new Date(),
            status: status || 'draft',
            relatedArticles: relatedArticles || [],
            author: userId,
        });

        await blog.save();
        const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

        res.status(201).json(populatedBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

// Update blog (requires authentication and admin role)
router.put('/:id', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const {
            title,
            slug,
            description,
            heroBadge,
            category,
            tags,
            content,
            featuredImage,
            publishDate,
            relatedArticles,
            status
        } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if slug is being changed and if it already exists
        if (slug && slug !== blog.slug) {
            const existingBlog = await Blog.findOne({ slug });
            if (existingBlog) {
                return res.status(400).json({ error: 'Slug already exists' });
            }
        }

        // Update fields
        if (title) blog.title = title;
        if (slug) blog.slug = slug;
        if (description) blog.description = description;
        if (heroBadge !== undefined) blog.heroBadge = heroBadge;
        if (category) blog.category = category;
        if (tags) blog.tags = Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim());
        if (content) blog.content = content;
        if (featuredImage !== undefined) blog.featuredImage = featuredImage;
        if (publishDate) blog.publishDate = new Date(publishDate);
        if (status) blog.status = status;
        if (relatedArticles !== undefined) blog.relatedArticles = relatedArticles;

        await blog.save();
        const updatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

        res.json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
});

// Delete blog (requires authentication and admin role)
router.delete('/:id', verifyToken, requireAdmin, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

export default router;
