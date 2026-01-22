import { Request, Response } from 'express';
import { FeatureConfig, FeatureName } from '../models/FeatureConfig';
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
}
