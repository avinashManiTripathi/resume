import express, { Request, Response } from 'express';
import { LANDING_PAGE_DATA } from '../constants/landing-data.constants';

const router = express.Router();

/**
 * GET /api/landing/config
 * Get all landing page configuration data (navigation + footer)
 */
router.get('/config', (req: Request, res: Response) => {
    try {
        res.json(LANDING_PAGE_DATA);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch landing page configuration' });
    }
});

/**
 * GET /api/landing/navigation
 * Get navigation data only
 */
router.get('/navigation', (req: Request, res: Response) => {
    try {
        res.json(LANDING_PAGE_DATA.navigation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch navigation data' });
    }
});

/**
 * GET /api/landing/footer
 * Get footer data only
 */
router.get('/footer', (req: Request, res: Response) => {
    try {
        res.json(LANDING_PAGE_DATA.footer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch footer data' });
    }
});

export default router;
