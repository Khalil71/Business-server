var Router = require('express').Router;

var Workspaces = require('./Workspaces.Controller');

var router = new Router();

router.post('/:companyDisplayName/workspaces', Workspaces.createWorkspace);
router.patch('/:companyDisplayName/workspaces/:workspaceDispalyName', Workspaces.updateWorkspace);

module.exports = router;
