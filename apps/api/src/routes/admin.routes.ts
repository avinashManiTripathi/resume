import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { verifyToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();
const adminController = new AdminController();

// Feature management routes
router.get('/feature-settings', verifyToken, requireAdmin, adminController.getFeatureSettings);
router.post('/feature-settings', verifyToken, requireAdmin, adminController.updateFeatureSetting);

export default router;
