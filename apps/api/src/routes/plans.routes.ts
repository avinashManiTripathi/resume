import { Router, Request, Response } from 'express';
import { Plan } from '../models/Plan';

const router = Router();

/**
 * Get all active subscription plans
 * GET /api/plans
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const plans = await Plan.find({ isActive: true }).sort({ monthlyPrice: 1 });
        res.json({
            success: true,
            plans
        });
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({ error: 'Failed to fetch plans' });
    }
});

export default router;
