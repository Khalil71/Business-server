var Router = require('express').Router;
var CompaniesRoutes = require('../apis/Companies/index');
var WorkspacesRoutes = require('../apis/Workspaces/index');
var UserRoutes = require('../apis/Users/index');

var router = new Router();

// Companies routes
router.use('/', CompaniesRoutes);
// Workspaces routes
router.use('/', WorkspacesRoutes);
// User routes
router.use('/', UserRoutes);

module.exports = router;
