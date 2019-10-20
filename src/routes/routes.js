import { Router } from 'express';
import CompaniesRoutes from '../apis/Companies/index';
import WorkspacesRoutes from '../apis/Workspaces/index';
import UserRoutes from '../apis/Users/index';

var router = new Router();

// Companies routes
router.use('/', CompaniesRoutes);
// Workspaces routes
router.use('/', WorkspacesRoutes);
// User routes
router.use('/', UserRoutes);

export default router;
