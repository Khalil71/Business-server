const { Router } = require('express');

const { createWorkspace, updateWorkspace } = require('./Workspaces.Controller');

let router = new Router();

router.post('/:companyDisplayName/workspaces', createWorkspace);
router.patch('/:companyDisplayName/workspaces/:workspaceDisplayName', updateWorkspace);

module.exports = router;
