const { Router } = require('express');

const Workspaces = require('./Workspaces.Controller');

let router = new Router();

router.post('/:companyDisplayName/workspaces', Workspaces.createWorkspace);
router.patch('/:companyDisplayName/workspaces/:workspaceDispalyName', Workspaces.updateWorkspace);

module.exports = router;
