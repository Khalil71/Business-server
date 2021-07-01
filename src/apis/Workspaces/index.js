const { Router } = require('express');

const { createWorkspace, updateWorkspace } = require('./Workspaces.Controller');
const { paramsValidation, bodyValidation } = require('./Workspaces.middleware');

let router = new Router();

router.post('/:companyDisplayName/workspaces', paramsValidation(), createWorkspace);
router.patch(
  '/:companyDisplayName/workspaces/:workspaceDisplayName',
  paramsValidation(),
  bodyValidation(),
  updateWorkspace
);

module.exports = router;
