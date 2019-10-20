const { Router } = require('express');

const { createUser, updateUser, removeUser } = require('./Users.Controller');

let router = new Router();

router.post('/:companyDisplayName/workspaces/:workspaceDisplayName/users', createUser);
router.patch('/:companyDisplayName/workspaces/:workspaceDisplayName/users', updateUser);
router.delete('/:companyDisplayName/workspaces/:workspaceDisplayName/users', removeUser);

module.exports = router;
