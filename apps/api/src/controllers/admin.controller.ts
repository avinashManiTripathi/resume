import { Request, Response } from 'express';
import { FeatureConfig, FeatureName } from '../models/FeatureConfig';
import { Plan } from '../models/Plan';
import { AuthRequest } from '../middleware/auth.middleware';

export class AdminController {
    /**
     * Get all feature configurations
     */
    public getFeatureSettings = async (req: Request, res: Response) => {
        try {
            // If database is empty, seed with default features
            let settings = await FeatureConfig.find();

            if (settings.length === 0) {
                const defaults = [
                    { name: FeatureName.ATS_CHECK, description: 'ATS Resume Scorer', isPremium: true },
                    { name: FeatureName.TAILOR, description: 'AI Resume Tailoring', isPremium: true },
                    { name: FeatureName.PDF_EXPORT, description: 'PDF Download/Export', isPremium: true },
                    { name: FeatureName.COVER_LETTER, description: 'AI Cover Letter Builder', isPremium: true },
                    { name: FeatureName.MOCK_INTERVIEW, description: 'AI Mock Interviews', isPremium: true },
                ];
                settings = await FeatureConfig.insertMany(defaults);
            }

            res.json({ success: true, settings });
        } catch (error) {
            console.error('Error fetching feature settings:', error);
            res.status(500).json({ error: 'Failed to fetch feature settings' });
        }
    };

    /**
     * Update a feature configuration
     */
    public updateFeatureSetting = async (req: Request, res: Response) => {
        try {
            const { name, isPremium } = req.body;
            const authReq = req as AuthRequest;
            const adminId = authReq.user?.userId;

            if (!name || isPremium === undefined) {
                return res.status(400).json({ error: 'Missing feature name or premium status' });
            }

            const setting = await FeatureConfig.findOneAndUpdate(
                { name },
                {
                    isPremium,
                    updatedBy: adminId
                },
                { new: true, upsert: true }
            );

            res.json({ success: true, setting });
        } catch (error) {
            console.error('Error updating feature setting:', error);
            res.status(500).json({ error: 'Failed to update feature setting' });
        }
    };

    /**
     * Get all plans (including inactive ones)
     */
    public getPlans = async (req: Request, res: Response) => {
        try {
            let plans = await Plan.find().sort({ monthlyPrice: 1 });

            if (plans.length === 0) {
                const defaults = [
                    {
                        planId: 'pro',
                        name: 'Pro',
                        description: 'Best for job seekers',
                        monthlyPrice: 499,
                        annualPrice: 4990,
                        currency: 'INR',
                        features: ['Unlimited Resumes', '10+ Premium Templates', 'PDF Downloads', 'Word Export', 'Email Support'],
                        popular: true,
                        isActive: true
                    },
                    {
                        planId: 'premium',
                        name: 'Premium',
                        description: 'For professionals',
                        monthlyPrice: 999,
                        annualPrice: 9990,
                        currency: 'INR',
                        features: ['Everything in Pro', 'All Templates', 'Priority Support', 'AI Features', 'Analytics', 'Cover Letters'],
                        popular: false,
                        isActive: true
                    }
                ];
                plans = await Plan.insertMany(defaults);
            }

            res.json({ success: true, plans });
        } catch (error) {
            console.error('Error fetching plans:', error);
            res.status(500).json({ error: 'Failed to fetch plans' });
        }
    };

    /**
     * Create a new subscription plan
     */
    public createPlan = async (req: Request, res: Response) => {
        try {
            const planData = req.body;
            const plan = await Plan.create(planData);
            res.status(201).json({ success: true, plan });
        } catch (error) {
            console.error('Error creating plan:', error);
            res.status(500).json({ error: 'Failed to create plan' });
        }
    };

    /**
     * Update an existing subscription plan
     */
    public updatePlan = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const planData = req.body;
            const plan = await Plan.findByIdAndUpdate(id, planData, { new: true });
            if (!plan) return res.status(404).json({ error: 'Plan not found' });
            res.json({ success: true, plan });
        } catch (error) {
            console.error('Error updating plan:', error);
            res.status(500).json({ error: 'Failed to update plan' });
        }
    };

    /**
     * Delete a subscription plan
     */
    public deletePlan = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const plan = await Plan.findByIdAndDelete(id);
            if (!plan) return res.status(404).json({ error: 'Plan not found' });
            res.json({ success: true, message: 'Plan deleted successfully' });
        } catch (error) {
            console.error('Error deleting plan:', error);
            res.status(500).json({ error: 'Failed to delete plan' });
        }
    };
}
