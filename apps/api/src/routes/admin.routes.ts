import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { verifyToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();
const adminController = new AdminController();

// Feature management routes
router.get('/feature-settings', verifyToken, requireAdmin, adminController.getFeatureSettings);
router.post('/feature-settings', verifyToken, requireAdmin, adminController.updateFeatureSetting);

// Subscription plan management
router.get('/plans', verifyToken, requireAdmin, adminController.getPlans);
router.post('/plans', verifyToken, requireAdmin, adminController.createPlan);
router.put('/plans/:id', verifyToken, requireAdmin, adminController.updatePlan);
router.delete('/plans/:id', verifyToken, requireAdmin, adminController.deletePlan);

export default router;
