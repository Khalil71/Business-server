const { Router } = require('express');

const Users = require('./Users.Controller');

let router = new Router();

router.post('/:companyDisplayName/workspaces/:workspaceDisplayName/users', Users.createUser);
router.patch('/:companyDisplayName/workspaces/:workspaceDisplayName/users', Users.updateUser);
router.delete('/:companyDisplayName/workspaces/:workspaceDisplayName/users', Users.removeUser);

module.exports = router;
