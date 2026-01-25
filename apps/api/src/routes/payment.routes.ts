import { Router, Request, Response } from 'express';
import { razorpayService } from '../services/razorpay.service';
import { config } from '../config';

const router = Router();

/**
 * Process card payment
 * POST /api/payment/process-card
 */
router.post('/process-card', async (req: Request, res: Response) => {
    try {
        const { cardNumber, cardName, expiryMonth, expiryYear, cvv, email, amount } = req.body;

        // Validate required fields
        if (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvv || !email || !amount) {
            return res.status(400).json({ error: 'Missing required payment fields' });
        }

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock successful payment
        const payment = {
            id: `pay_${Date.now()}`,
            method: 'card',
            amount,
            currency: 'USD',
            status: 'succeeded',
            cardLast4: cardNumber.slice(-4),
            email,
            createdAt: new Date().toISOString(),
        };

        res.json({
            success: true,
            payment,
        });
    } catch (error) {
        console.error('Error processing card payment:', error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
});

/**
 * Process UPI payment
 * POST /api/payment/process-upi
 */
router.post('/process-upi', async (req: Request, res: Response) => {
    try {
        const { upiId, email, amount } = req.body;

        if (!upiId || !email || !amount) {
            return res.status(400).json({ error: 'Missing required payment fields' });
        }

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock successful payment
        const payment = {
            id: `pay_${Date.now()}`,
            method: 'upi',
            amount,
            currency: 'INR',
            status: 'succeeded',
            upiId,
            email,
            createdAt: new Date().toISOString(),
        };

        res.json({
            success: true,
            payment,
        });
    } catch (error) {
        console.error('Error processing UPI payment:', error);
        res.status(500).json({ error: 'Payment processing failed' });
    }
});

/**
 * Initiate PayPal payment
 * POST /api/payment/process-paypal
 */
router.post('/process-paypal', async (req: Request, res: Response) => {
    try {
        const { email, amount } = req.body;

        if (!email || !amount) {
            return res.status(400).json({ error: 'Missing required payment fields' });
        }

        // Mock PayPal redirect URL
        const paypalUrl = `https://www.paypal.com/checkoutnow?token=EC-${Date.now()}`;

        res.json({
            success: true,
            redirectUrl: paypalUrl,
            paymentId: `paypal_${Date.now()}`,
        });
    } catch (error) {
        console.error('Error initiating PayPal payment:', error);
        res.status(500).json({ error: 'Payment initiation failed' });
    }
});

/**
 * Payment webhook handler
 * POST /api/payment/webhook
 */
router.post('/webhook', async (req: Request, res: Response) => {
    try {
        const signature = req.headers['x-razorpay-signature'] as string;

        // Use rawBody if available (from app.ts middleware), otherwise JSON.stringify (risky)
        // Since we enabled rawBody in app.ts, we should use that.
        const rawBody = (req as any).rawBody;

        if (!signature || !rawBody) {
            return res.status(400).json({ error: 'Missing signature or body' });
        }

        const isValid = razorpayService.verifyWebhookSignature(
            rawBody,
            signature,
            config.razorpay.webhookSecret
        );

        if (!isValid) {
            console.error('Invalid webhook signature');
            return res.status(400).json({ error: 'Invalid signature' });
        }

        const { event, data } = req.body;

        console.log('Payment webhook received:', event); // Don't log full data for PII

        // Handle different webhook events
        switch (event) {
            case 'payment.succeeded':
                // Update subscription status
                // console.log('Payment succeeded:', data);
                break;
            case 'payment.failed':
                // Handle failed payment
                // console.log('Payment failed:', data);
                break;
            default:
                console.log('Unknown webhook event:', event);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

export default router;
