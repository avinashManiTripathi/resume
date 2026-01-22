import { Router, Response, Request } from 'express';
import { verifyToken, AuthRequest } from '../middleware/auth.middleware';
import { Subscription, User } from '../models';
import { SubscriptionPlan, SubscriptionStatus } from '../models/Subscription';

const router = Router();

/**
 * Get current user's subscription status
 * GET /api/subscription/status
 */
router.get('/status', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const subscription = await Subscription.findOne({ userId }).sort({ createdAt: -1 });

        if (!subscription) {
            // Return a default free subscription if none exists
            return res.json({
                success: true,
                subscription: {
                    plan: SubscriptionPlan.FREE,
                    status: SubscriptionStatus.ACTIVE,
                    startDate: new Date(),
                }
            });
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
 * Create or upgrade subscription (Simulated payment)
 * POST /api/subscription/create
 */
router.post('/create', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        const { tier, paymentMethod, paymentId } = req.body;

        if (!userId || !tier) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate tier
        if (!Object.values(SubscriptionPlan).includes(tier)) {
            return res.status(400).json({ error: 'Invalid subscription tier' });
        }

        // Calculate expiry date (30 days from now)
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);

        // Update or Create subscription
        let subscription = await Subscription.findOne({ userId });

        if (subscription) {
            subscription.plan = tier as SubscriptionPlan;
            subscription.status = SubscriptionStatus.ACTIVE;
            subscription.startDate = startDate;
            subscription.endDate = endDate;
            // storing payment id if provided (e.g. razorpay_payment_id)
            if (paymentId) subscription.paymentId = paymentId;
            await subscription.save();
        } else {
            subscription = await Subscription.create({
                userId,
                plan: tier as SubscriptionPlan,
                status: SubscriptionStatus.ACTIVE,
                startDate,
                endDate,
                paymentId
            });
        }

        // Update user reference
        await User.findByIdAndUpdate(userId, { subscription: subscription._id });

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
 * Cancel subscription
 * POST /api/subscription/cancel
 */
router.post('/cancel', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const subscription = await Subscription.findOne({ userId });

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        subscription.status = SubscriptionStatus.CANCELLED;
        await subscription.save();

        res.json({
            success: true,
            message: 'Subscription cancelled successfully',
            subscription
        });
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        res.status(500).json({ error: 'Failed to cancel subscription' });
    }
});

/**
 * Get billing history (Mock)
 */
router.get('/invoices', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const subscription = await Subscription.findOne({ userId });

        if (!subscription) {
            return res.json({ success: true, invoices: [] });
        }

        // Mock invoice data
        const invoices = [
            {
                id: `inv_${Date.now()}`,
                amount: subscription.plan === SubscriptionPlan.PRO ? 900 : subscription.plan === SubscriptionPlan.PREMIUM ? 1900 : 0,
                status: 'paid',
                date: subscription.startDate,
                description: `${subscription.plan.toUpperCase()} Plan Subscription`,
                currency: 'INR'
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

