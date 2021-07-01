const { Router } = require('express');

const { createUser, updateUser, removeUser } = require('./Users.Controller');
const { createValidation, updateValidation, removeValidation } = require('./Users.middleware');

let router = new Router();

router.post('/:companyDisplayName/workspaces/:workspaceDisplayName/users', createValidation(), createUser);
router.patch('/:companyDisplayName/workspaces/:workspaceDisplayName/users', updateValidation(), updateUser);
router.delete('/:companyDisplayName/workspaces/:workspaceDisplayName/users', removeValidation(), removeUser);

module.exports = router;
