import { Router, Request, Response } from 'express';

const router = Router();

// Mock subscription database (replace with real database in production)
const subscriptions = new Map<string, any>();

/**
 * Create new subscription
 * POST /api/subscription/create
 */
router.post('/create', async (req: Request, res: Response) => {
    try {
        const { userId, tier, paymentMethod, paymentData } = req.body;

        if (!userId || !tier) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Simulate payment processing
        const subscription = {
            id: `sub_${Date.now()}`,
            userId,
            tier,
            active: true,
            startDate: new Date().toISOString(),
            expiryDate: tier !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            paymentMethod,
            createdAt: new Date().toISOString(),
        };

        subscriptions.set(userId, subscription);

        res.status(201).json({
            success: true,
            subscription,
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
});

/**
 * Get subscription status
 * GET /api/subscription/status/:userId
 */
router.get('/status/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const subscription = subscriptions.get(userId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        res.json({
            success: true,
            subscription,
        });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        res.status(500).json({ error: 'Failed to fetch subscription' });
    }
});

/**
 * Update subscription tier
 * PUT /api/subscription/update
 */
router.put('/update', async (req: Request, res: Response) => {
    try {
        const { userId, tier } = req.body;

        if (!userId || !tier) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const subscription = subscriptions.get(userId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        subscription.tier = tier;
        subscription.updatedAt = new Date().toISOString();

        subscriptions.set(userId, subscription);

        res.json({
            success: true,
            subscription,
        });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ error: 'Failed to update subscription' });
    }
});

/**
 * Cancel subscription
 * DELETE /api/subscription/cancel/:userId
 */
router.delete('/cancel/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const subscription = subscriptions.get(userId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        subscription.active = false;
        subscription.cancelledAt = new Date().toISOString();

        subscriptions.set(userId, subscription);

        res.json({
            success: true,
            message: 'Subscription cancelled successfully',
        });
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        res.status(500).json({ error: 'Failed to cancel subscription' });
    }
});

/**
 * Get billing history
 * GET /api/subscription/invoices/:userId
 */
router.get('/invoices/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const subscription = subscriptions.get(userId);

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        // Mock invoice data
        const invoices = [
            {
                id: `inv_${Date.now()}`,
                amount: subscription.tier === 'pro' ? 9 : subscription.tier === 'premium' ? 19 : 0,
                status: 'paid',
                date: subscription.startDate,
                description: `${subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan`,
            },
        ];

        res.json({
            success: true,
            invoices,
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

export default router;
