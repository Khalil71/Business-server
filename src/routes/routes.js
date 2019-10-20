const { Router } = require('express');
const CompaniesRoutes = require('../apis/Companies/index');
const WorkspacesRoutes = require('../apis/Workspaces/index');
const UserRoutes = require('../apis/Users/index');

let router = new Router();

// Companies routes
router.use('/', CompaniesRoutes);
// Workspaces routes
router.use('/', WorkspacesRoutes);
// User routes
router.use('/', UserRoutes);

module.exports = router;
